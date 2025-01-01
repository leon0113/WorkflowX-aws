module.exports = {
    apps: [
        {
            name: "workflowx",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development"
            }
        }
    ]
}