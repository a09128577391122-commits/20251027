let t = 0.0;
let vel = 0.02;
let num;
let paletteSelected;
let paletteSelected1;
let paletteSelected2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2)
    angleMode(DEGREES);
    num = random(100000);
    paletteSelected = random(palettes);
    paletteSelected1 = random(palettes);
    paletteSelected2 = random(palettes);

    // 新增：建立隱藏式左側選單
    createSidebar();
}

function draw() {
	randomSeed(num);
	// background("#355070");
	background(bgCol())
	stroke("#355070");
	circlePacking() 
}

function circlePacking() {
	push();

	translate(width / 2, height / 2)
	let points = [];
	let count = 2000;
	for (let i = 0; i < count; i++) {
		let a = random(360);
		let d = random(width * 0.35);
		let s = random(200);
		let x = cos(a) * (d - s / 2);
		let y = sin(a) * (d - s / 2);
		let add = true;
		for (let j = 0; j < points.length; j++) {
			let p = points[j];
			if (dist(x, y, p.x, p.y) < (s + p.z) * 0.6) {
				add = false;
				break;
			}
		}
		if (add) points.push(createVector(x, y, s));
	}
	for (let i = 0; i < points.length; i++) {

		let p = points[i];
		let rot = random(360);
		push();
		translate(p.x, p.y);
		rotate(rot);
		blendMode(OVERLAY)
		let r = p.z - 5;
		gradient(r)
		shape(0, 0, r)
		pop();
	}
	pop();
 }

function shape(x, y, r) {
	push();
noStroke();
//fill(randomCol())
	translate(x, y);
	let radius = r; //半径
	let nums = 8
	for (let i = 0; i < 360; i += 360 / nums) {
		let ex = radius * sin(i);
		let ey = radius * cos(i);
		push();
		translate(ex,ey)
		rotate(atan2(ey, ex))
		distortedCircle(0,0,r);
	
		pop();
		stroke(randomCol())
		strokeWeight(0.5)
		line(0,0,ex,ey)
		ellipse(ex,ey,2)
	}


	pop();
}

function distortedCircle(x, y, r) {
	push();
	translate(x, y)
	//points
	let p1 = createVector(0, -r / 2);
	let p2 = createVector(r / 2, 0);
	let p3 = createVector(0, r / 2);
	let p4 = createVector(-r / 2, 0)
	//anker
	let val = 0.3;
	let random_a8_1 = random(-r * val, r * val)
	let random_a2_3 = random(-r * val, r * val)
	let random_a4_5 = random(-r * val, r * val)
	let random_a6_7 = random(-r * val, r * val)
	let ran_anker_lenA = r * random(0.2, 0.5)
	let ran_anker_lenB = r * random(0.2, 0.5)
	let a1 = createVector(ran_anker_lenA, -r / 2 + random_a8_1);
	let a2 = createVector(r / 2 + random_a2_3, -ran_anker_lenB);
	let a3 = createVector(r / 2 - random_a2_3, ran_anker_lenA);
	let a4 = createVector(ran_anker_lenB, r / 2 + random_a4_5);
	let a5 = createVector(-ran_anker_lenA, r / 2 - random_a4_5);
	let a6 = createVector(-r / 2 + random_a6_7, ran_anker_lenB);
	let a7 = createVector(-r / 2 - random_a6_7, -ran_anker_lenA);
	let a8 = createVector(-ran_anker_lenB, -r / 2 - random_a8_1);
	beginShape();
	vertex(p1.x, p1.y);
	bezierVertex(a1.x, a1.y, a2.x, a2.y, p2.x, p2.y)
	bezierVertex(a3.x, a3.y, a4.x, a4.y, p3.x, p3.y)
	bezierVertex(a5.x, a5.y, a6.x, a6.y, p4.x, p4.y)
	bezierVertex(a7.x, a7.y, a8.x, a8.y, p1.x, p1.y)
	endShape();
	pop();
}
 function mouseClicked() {
	shuffle(paletteSelected, true);
	 shuffle(bgpalette,true);
}
function randomCol(){
	let randoms = int(random(1,paletteSelected.length));
	return color(paletteSelected[randoms]);
 }
function bgCol(){
	let randoms = int(random(0,bgpalette.length));
	return color(bgpalette[randoms]);
 }

function gradient(r) {
	col1 = color(random(paletteSelected1));
	//col1.setAlpha(130)
	col2 = random(paletteSelected2);

	noStroke();
	let gradientFill = drawingContext.createLinearGradient(
		0,
		-r,
		0,
		r
	);
	gradientFill.addColorStop(0, color(col1));
	gradientFill.addColorStop(1, color(col2));
	drawingContext.fillStyle = gradientFill;
}
//example, [0]= background,[1]= stroke, [2~6] = fill
let bgpalette = 	["#488a50",  "#bf5513", "#3b6fb6", "#4f3224", "#9a7f6e","#1c3560", '#4a4e69',"#333","#413e49","#5da4a9"]
let  palettes = [
	["#e9dbce", "#ea526f", "#fceade", "#e2c290", "#6b2d5c", "#25ced1"],
	["#e9dbce", "#d77a61", "#223843", "#eff1f3", "#dbd3d8", "#d8b4a0"],
	["#e29578", "#006d77", "#83c5be", "#ffddd2", "#edf6f9"],
	["#e9dbce", "#cc3528", "#028090", "#00a896", "#f8c522"],
	["#e9dbce", "#92accc", "#f8f7c1", "#f46902", "#da506a", "#fae402"],
	["#e42268", "#fb8075", "#761871", "#5b7d9c", "#a38cb4", "#476590"],
	['#f9b4ab', '#679186', '#fdebd3', '#264e70', '#bbd4ce'],
	['#1f306e', '#c7417b', '#553772', '#8f3b76', '#f5487f'],
	['#e0f0ea', '#95adbe', '#574f7d', '#503a65', '#3c2a4d'],
	['#413e4a', '#b38184', '#73626e', '#f0b49e', '#f7e4be'],
	['#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4'],
	['#99b898', '#fecea8', '#ff847c', '#e84a5f', '#2a363b'],
	['#69d2e7', '#a7dbd8', '#e0e4cc', '#f38630', '#fa6900'],
	['#fe4365', '#fc9d9a', '#f9cdad', '#c8c8a9', '#83af9b'],
	['#ecd078', '#d95b43', '#c02942', '#542437', '#53777a'],
	['#556270', '#4ecdc4', '#c7f464', '#ff6b6b', '#c44d58'],
	['#774f38', '#e08e79', '#f1d4af', '#ece5ce', '#c5e0dc'],
	['#e8ddcb', '#cdb380', '#036564', '#033649', '#031634'],
	['#490a3d', '#bd1550', '#e97f02', '#f8ca00', '#8a9b0f'],
	['#594f4f', '#9de0ad', '#547980', '#45ada8', '#e5fcc2'],
	['#00a0b0', '#cc333f', '#6a4a3c', '#eb6841', '#edc951'],
	['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921'],
	['#ed6a5a', '#9bc1bc', '#f4f1bb', '#5ca4a9', '#e6ebe0'],
	['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'],
	['#22223b', '#c9ada7', '#4a4e69', '#9a8c98', '#f2e9e4'],
	['#114b5f', '#1a936f', '#88d498', '#c6dabf', '#f3e9d2'],
	['#3d5a80', '#98c1d9', '#e0fbfc', '#ee6c4d', '#293241'],
	['#06aed5', '#f0c808', '#086788', '#fff1d0', '#dd1c1a'],
	['#540d6e', '#ee4266', '#ffd23f', '#3bceac', '#0ead69'],
	['#c9cba3', '#e26d5c', '#ffe1a8', '#723d46', '#472d30'],
	["#3c4cad", "#5FB49C", "#e8a49c"],
	["#1c3560", "#ff6343", "#f2efdb", "#fea985"],
	["#e0d7c5", "#488a50", "#b59a55", "#bf5513", "#3b6fb6", "#4f3224", "#9a7f6e"], //o-ball
	["#DEEFB7", "#5FB49C", "#ed6a5a"],
	["#2B2B2B", "#91B3E1", "#2F5FB3", "#3D4B89", "#AE99E8", "#DBE2EC"], //clipper_tea.snore&peace.
	["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"],
	["#A8C25D", "#5B7243", "#FFA088", "#FFFB42", "#a9cff0", "#2D6EA6"], //2025/07/08
	["#F9F9F1",  "#191A18","#E15521", "#3391CF", "#E4901C", "#F5B2B1", "#009472"]//reference :: @posterlad :: https://x.com/posterlad/status/1963188864446566493
];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// 新增函式：建立隱藏式側邊選單並控制滑出/收回行為
function createSidebar() {
    // CSS
    const style = document.createElement('style');
    style.innerHTML = `
    .sidebar {
        position: fixed;
        left: -320px;
        top: 0;
        width: 320px;
        height: 100vh;
        background: rgba(18, 18, 20, 0.95);
        color: #fff;
        transition: left 0.28s ease;
        z-index: 9999;
        padding-top: 40px;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }
    .sidebar ul { list-style: none; padding: 0 20px; margin: 0; }
    .sidebar li {
        padding: 18px 10px;
        font-size: 32px; /* 文字大小 32px */
        cursor: pointer;
        user-select: none;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        color: #ffffff;
        transition: color 0.18s ease, background 0.18s ease;
    }
    /* 滑鼠移到文字時變色 & 背景輕微高亮 */
    .sidebar li:hover {
        color: #ffd166;
        background: rgba(255,255,255,0.03);
    }

    /* iframe overlay */
    .iframe-overlay {
        position: fixed;
        inset: 0;
        display: none;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.6);
        z-index: 10010;
        padding: 20px;
        box-sizing: border-box;
    }
    .iframe-wrap {
        width: 70vw; /* 70% 視窗寬 */
        height: 85vh; /* 85% 視窗高 */
        background: #ffffff;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        position: relative;
        border-radius: 8px;
        overflow: hidden;
    }
    .iframe-wrap iframe {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
    }
    .iframe-close {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        border: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }
    `;
    document.head.appendChild(style);

    // HTML: sidebar
    const sb = document.createElement('div');
    sb.className = 'sidebar';
    sb.innerHTML = `
        <ul>
            <li id="opt1">第一單元作品</li>
            <li id="opt2">第一單元講義</li>
            <li id="opt3">測驗系統</li>
            <li id="opt4">回首頁</li>
        </ul>
    `;
    document.body.appendChild(sb);

    // HTML: iframe overlay (hidden by default)
    const overlay = document.createElement('div');
    overlay.className = 'iframe-overlay';
    overlay.innerHTML = `
        <div class="iframe-wrap" role="dialog" aria-modal="true">
            <button class="iframe-close" aria-label="關閉">&times;</button>
            <iframe src="" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        </div>
    `;
    document.body.appendChild(overlay);

    const iframe = overlay.querySelector('iframe');
    const closeBtn = overlay.querySelector('.iframe-close');

    function showIframe(url) {
        iframe.src = url;
        overlay.style.display = 'flex';
    }
    function hideIframe() {
        // 清空 src 以停止內容播放
        iframe.src = '';
        overlay.style.display = 'none';
    }

    // 顯示/隱藏側邊邏輯
    let hideTimeout = null;
    const openWhen = 24; // 滑鼠靠左邊緣多少像素時開啟
    const sidebarWidth = 320;

    window.addEventListener('mousemove', (e) => {
        if (e.clientX <= openWhen) {
            sb.style.left = '0';
            if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
        } else {
            if (e.clientX > sidebarWidth + 20) {
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    sb.style.left = `-${sidebarWidth}px`;
                }, 420);
            }
        }
    });

    sb.addEventListener('mouseenter', () => {
        if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
    });
    sb.addEventListener('mouseleave', () => {
        sb.style.left = `-${sidebarWidth}px`;
    });

    // 選單按鈕事件：第一單元作品改為開啟 iframe 視窗 (70% 寬, 85% 高)
    document.getElementById('opt1').addEventListener('click', () => {
        showIframe('https://a09128577391122-commits.github.io/20251020/');
    });
    // 修改：第一單元講義改為在 iframe 中開啟指定 HackMD 網頁
    document.getElementById('opt2').addEventListener('click', () => {
        showIframe('https://hackmd.io/@eke3iKvTStyqwC8LrXhR2g/rJu1vQAiex');
    });
    document.getElementById('opt3').addEventListener('click', () => { window.location.hash = '#quiz'; });
    document.getElementById('opt4').addEventListener('click', () => { window.location.hash = '#home'; });

    // overlay 行為：點背景或關閉按鈕皆可關閉
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) hideIframe();
    });
    closeBtn.addEventListener('click', hideIframe);

    // Esc 關閉
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') hideIframe();
    });
}
