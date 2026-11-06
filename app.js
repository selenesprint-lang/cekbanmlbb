const $ = (id) => document.getElementById(id);
const form = $("checkForm"), button = $("checkBtn"), message = $("message"), result = $("result");
function showMessage(text, ok=false){message.textContent=text;message.className="message"+(ok?" ok":"");message.hidden=false;}
function hideMessage(){message.hidden=true;}
function value(v){return v===null||v===undefined||v===""?"—":String(v);}
form.addEventListener("submit", async (e)=>{
  e.preventDefault(); hideMessage(); result.hidden=true;
  const player_id=$("playerId").value.trim(), zone_id=$("zoneId").value.trim();
  if(!/^\d+$/.test(player_id)||!/^\d+$/.test(zone_id)){showMessage("Player ID dan Zone ID harus berupa angka.");return;}
  button.disabled=true;button.querySelector("span").textContent="SEDANG MEMERIKSA...";
  try{
    const res=await fetch("/api/cekban",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({player_id,zone_id})});
    const data=await res.json();
    if(!res.ok||!data.success)throw new Error(data.error||data.message||"Permintaan gagal. Periksa konfigurasi API.");
    $("nickname").textContent=value(data.nickname);
    $("outPlayer").textContent=value(data.player_id??player_id);
    $("outZone").textContent=value(data.zone_id??zone_id);
    $("banStatus").textContent=value(data.ban_status);
    $("banReason").textContent=value(data.ban_reason);
    $("pointsDeducted").textContent=value(data.points_deducted??0);
    $("pointsRemaining").textContent=value(data.points_remaining);
    $("processingTime").textContent=value(data.processing_time);
    const s=String(data.ban_status??"").toLowerCase();
    const pill=$("statusPill");pill.className="status-pill";
    if(/not.?ban|unban|safe|clean|tidak|normal/.test(s)){pill.classList.add("good");pill.textContent="TIDAK TERDETEKSI BAN";}
    else if(/ban|suspend|block/.test(s)){pill.classList.add("bad");pill.textContent="TERDETEKSI BAN";}
    else pill.textContent="STATUS DITERIMA";
    result.hidden=false;showMessage("Pengecekan berhasil. Berikut hasil dari API.",true);
  }catch(err){showMessage(err.message||"Terjadi kesalahan saat menghubungi server.");}
  finally{button.disabled=false;button.querySelector("span").textContent="PERIKSA STATUS BAN";}
});
$("balanceBtn").addEventListener("click",async()=>{
  const b=$("balanceBtn"),out=$("balance");b.disabled=true;b.textContent="MEMUAT...";
  try{
    const res=await fetch("/api/balance");const data=await res.json();
    if(!res.ok||!data.success)throw new Error(data.error||data.message||"Gagal mengambil informasi saldo.");
    out.innerHTML="";
    [["NAMA API",data.name],["SISA POIN",data.points_remaining],["TOTAL PENGGUNAAN",data.total_usage],["TERAKHIR DIGUNAKAN",data.last_used],["DIBUAT PADA",data.created_at]].forEach(([label,val])=>{
      const d=document.createElement("div"),small=document.createElement("span"),strong=document.createElement("b");
      small.textContent=label;strong.textContent=value(val);d.append(small,strong);out.append(d);
    });
    out.hidden=false;
  }catch(err){out.hidden=false;out.textContent=err.message;}
  finally{b.disabled=false;b.innerHTML='CEK SALDO <span>↗</span>';}
});