interface ErrorObj {
  error: string;
}

export async function getConfig(address: string): Promise<Record<string, unknown>> {
  const response = await fetch(address + "/config", { method: "GET" });
  if (!response.ok) {
    const obj: ErrorObj = await response.json();
    throw new Error(`cannot get configuraiton: ${obj.error} (${response.statusText})`);
  }
  return await response.json();
}

export async function setConfig(address: string, obj: Record<string, unknown>): Promise<void> {
  const jsonString = JSON.stringify(obj);
  const response = await fetch(address + "/load", {
    method: "POST",
    body: new Buffer(jsonString),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    let obj: ErrorObj;
    try {
      obj = await response.json();
    } catch (e) {
      throw new Error(`cannot set configuration: ${response.statusText}`);
    }
    throw new Error(`cannot set configuration: ${obj.error} (${response.statusText})`);
  }
}
