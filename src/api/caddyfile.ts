export async function getCaddyfile(address: string): Promise<string> {
  const response = await fetch(address + "/caddyfile", {
    method: "GET",
  });
  if (!response.ok) {
    const obj = await response.json();
    throw new Error(`cannot get Caddyfile: ${obj.error} (${response.statusText})`);
  }
  if (response.body !== null) {
    return await response.text();
  }
  return "";
}

export async function setCaddyfile(address: string, content: string): Promise<string> {
  const response = await fetch(address + "/caddyfile", {
    method: "PUT",
    body: new Buffer(content),
    headers: { "Content-Type": "application/octet-stream" },
  });
  if (!response.ok) {
    const obj = await response.json();
    throw new Error(`cannot set Caddyfile: ${obj.error} (${response.statusText})`);
  }
  if (response.body !== null) {
    return await response.text();
  }
  return "";
}
