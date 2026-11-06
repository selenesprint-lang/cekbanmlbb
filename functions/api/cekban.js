
export async function onRequestPost({ request, env }) {
  if (!env.JEBRAY_API_KEY) {
    return json({
      success: false,
      error: "API Key belum dipasang di Cloudflare."
    }, 500);
  }

  try {
    const body = await request.json();

    if (
      !body.player_id ||
      !body.zone_id ||
      !/^\d+$/.test(String(body.player_id)) ||
      !/^\d+$/.test(String(body.zone_id))
    ) {
      return json({
        success: false,
        error: "Player ID dan Zone ID harus berupa angka."
      }, 400);
    }

    const upstream = await fetch(
      "https://api.jebray.com/tools/cekban/v3",
      {
        method: "POST",
        headers: {
          "X-API-Key": env.JEBRAY_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          player_id: String(body.player_id),
          zone_id: String(body.zone_id)
        })
      }
    );

    const data = await upstream.json();

    return json(data, upstream.status);

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
