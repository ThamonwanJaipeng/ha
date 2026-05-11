document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('demoBtn');
    const status = document.getElementById('statusText');

    btn.addEventListener('click', () => {
        status.textContent = 'Button clicked! 🚀';
        status.style.color = 'var(--success)';
        
        setTimeout(() => {
            status.textContent = 'Ready';
            status.style.color = 'var(--muted)';
        }, 2000);
    });
});
// ใส่ Token ที่คุณก๊อปปี้มาตรงนี้
const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmMjZmNjc4NTJlMDE0ZGRlOTU1NjJlMzFkMWUyZjIwNiIsImlhdCI6MTc3ODQ3MjY5MiwiZXhwIjoyMDkzODMyNjkyfQ.V8D82K66t34D3P65bPqcKJl_vNonIC4UvtM9zrNqToI";
const HA_URL = "/api/states"; // เข้าผ่าน Ingress ไม่ต้องใส่ IP

async function toggleDevice(entity_id, state) {
    const service = state ? 'turn_on' : 'turn_off';
    const domain = entity_id.split('.')[0];
    
    try {
        await fetch(`/api/services/${domain}/${service}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HA_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ entity_id: entity_id }),
        });
        console.log(`${entity_id} is now ${service}`);
    } catch (e) {
        console.error("Error controlling device:", e);
    }
}

// รอให้หน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    // หาปุ่ม Switch ทั้งหมดในหน้าเว็บ
    const switches = document.querySelectorAll('.switch input');

    switches.forEach((checkbox, index) => {
        checkbox.addEventListener('change', (e) => {
            // กำหนด Entity ID ตามลำดับปุ่ม (ตัวอย่าง)
            let entityId = "";
            if (index === 0) entityId = "light.living_room"; // ปุ่มที่ 1
            if (index === 1) entityId = "switch.tv";          // ปุ่มที่ 2

            toggleDevice(entityId, e.target.checked);
        });
    });
});
async function updateSensors() {
    try {
        const response = await fetch("/api/states/sensor.living_room_temperature", {
            headers: { "Authorization": `Bearer ${HA_TOKEN}` }
        });
        const data = await response.json();
        
        // หา Element ที่แสดงอุณหภูมิแล้วเปลี่ยนค่า (ต้องไปใส่ id ใน HTML ก่อน)
        const tempElement = document.querySelector('.stat-card:nth-child(2) .value');
        tempElement.innerHTML = `${data.state}°C <span>Comfortable</span>`;
    } catch (e) {
        console.log("Update failed");
    }
}

// อัปเดตทุกๆ 30 วินาที
setInterval(updateSensors, 30000);
updateSensors();