// Env vars need to be mocked because Jest doesn't support import.meta
jest.mock('@/constants/env', () => {
    return {
        __esModule: true,
        SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2YnpscGVhaGFxaXN1ZHdodXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MjgzMzcsImV4cCI6MjAyMjEwNDMzN30._77D0y1S5TnDLG3IwZfLENrsvhd2c-EsLPc9MmXWo_Y",
        SUPABASE_URL: "https://wvbzlpeahaqisudwhuwh.supabase.co"
    }
})