// Fondo de partículas simple
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2 + 1,
    dx: Math.random()*1 - 0.5,
    dy: Math.random()*1 - 0.5
  });
}
function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>w)p.dx*=-1;
    if(p.y<0||p.y>h)p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,0,0,0.3)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize', ()=>{
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// Efecto “mirada” hacia el cursor activo
const techDivs = document.querySelectorAll('.tech-div');

techDivs.forEach(div => {
  div.addEventListener('mousemove', (e) => {
    const rect = div.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    // Giramos la tarjeta activa hacia su propio cursor
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    div.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Hacemos que los demás divs miren hacia la posición del cursor
    techDivs.forEach(other => {
      if(other !== div){
        const r = other.getBoundingClientRect();
        const dx = cursorX - (r.left + r.width/2);
        const dy = cursorY - (r.top + r.height/2);
        const angleX = Math.max(Math.min(dy/r.height*15,15),-15);
        const angleY = Math.max(Math.min(-dx/r.width*15,15),-15);
        other.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1)`;
      }
    });
  });

  div.addEventListener('mouseleave', () => {
    techDivs.forEach(d => d.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)');
  });
});