export async function setCaddyConfiguration(address: string, content: string, contentType: string): Promise<string> {
  const response = await fetch(address + "/load", {
    method: "POST",
    body: new Buffer(content),
    headers: { "Content-Type": contentType },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`cannot set configuration on Caddy: ${message} (${response.statusText})`);
  }
  if (response.body !== null) {
    return await response.text();
  }
  return "";
}
