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
import { useGetTeamsQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utlis";

const CustomToolbar = () => (
    <GridToolbarContainer className="toolbar flex gap-2 justify-end">
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
);

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 150 },
    { field: "productOwnerUserId", headerName: "Product Owner Id", width: 150 },
    { field: "productOwnerUserName", headerName: "Product Owner Name", width: 150 },
    { field: "projectManagerUserId", headerName: "Project Manager Id", width: 150 },
    { field: "projectManagerUserName", headerName: "Project Manager Name", width: 150 },
];

const Teams = () => {
    const { data: teams, isLoading, isError } = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !teams) return <div>Error fetching teams</div>;

    return (
        <div className="flex w-full flex-col p-8">
            <Header name="Teams" />
            <div style={{ height: 650, width: "100%" }}>
                <DataGrid
                    rows={teams || []}
                    columns={columns}
                    getRowId={(row) => row.id}
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

export default Teams;