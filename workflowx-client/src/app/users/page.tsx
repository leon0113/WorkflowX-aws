"use client";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/components/Header";
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { useGetUsersQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";

const CustomToolbar = () => (
    <GridToolbarContainer className="toolbar flex gap-2 justify-end">
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
);

const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 100 },
    {
        field: "profilePictureUrl",
        headerName: "Profile Picture",
        width: 150,
        renderCell: (params) => (
            <div className="flex h-full w-full items-center justify-start">
                <div className="h-9 w-9">
                    <Image
                        src={`/${params.value}`}
                        alt={params.row.username}
                        width={100}
                        height={50}
                        className="h-full rounded-full object-cover"
                    />
                </div>
            </div>
        ),
    },
    { field: "username", headerName: "Name", width: 150 },
    { field: "teamId", headerName: "Team ID", width: 150 },
];

const Users = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !users) return <div>Error fetching users</div>;

    return (
        <div className="flex w-full flex-col p-8">
            <Header name="Users" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={users || []}
                    columns={columns}
                    getRowId={(row) => row.userId}
                    pagination
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                />
            </div>
        </div>
    );
};

export default Users;