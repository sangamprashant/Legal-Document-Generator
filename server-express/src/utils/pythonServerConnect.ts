// utils/pythonServerConnect.ts
export const generateResult = async (prompt: string): Promise<string> => {
    const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: prompt }),
    });

    if (!response.ok) {
        throw new Error(`Python server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.result) {
        throw new Error("Python server did not return 'result'");
    }

    return data.result;
};
