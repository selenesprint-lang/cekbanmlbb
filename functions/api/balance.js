
export async function onRequestGet({ env }) {
  if (!env.JEBRAY_API_KEY) {
    return json({
      success: false,
      error: "API Key belum dipasang di Cloudflare."
    }, 500);
  }

  try {
    const response = await fetch(
      "https://api.jebray.com/tools/cekban/api/balance",
      {
        method: "GET",
        headers: {
          "X-API-Key": env.JEBRAY_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    return json(data, response.status);

  } catch (error) {
    return json({
      success: false,
      error: "Gagal menghubungi layanan API."
    }, 502);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}
