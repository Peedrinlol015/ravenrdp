module.exports = {
  apps: [
    {
      name: "ravenrdp",
      script: "npm",
      args: "start",
      cwd: "C:\\websites\\zen-rdp",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        NEXT_PUBLIC_BASE_URL: "https://ravenrdp.com",
        PLISIO_SECRET_KEY: "LeV2OV1HspTf1-NU5UD8khInvog1k-TaW0mrWr2xUKzGhVmQpRDGV5Qpqc_L2kiw",
        NEXT_PUBLIC_PLISIO_SECRET_KEY: "LeV2OV1HspTf1-NU5UD8khInvog1k-TaW0mrWr2xUKzGhVmQpRDGV5Qpqc_L2kiw",
      },
    },
  ],
}
