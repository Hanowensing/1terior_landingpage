/* ============ survey.js ============ */

// 이미지 데이터베이스(22장)
const imageDatabase = [
    // 미니멀리즘 (5장)
    { id: 1, style: '미니멀리즘', tone: '푸른톤', lighting: '은은한 조명', focalPoint: '장식', complexity: '단순', fileName: 'mini_blue_euneun_deco_simple.jpg' },
    { id: 2, style: '미니멀리즘', tone: '모노톤', lighting: '강한 조명', focalPoint: '장식', complexity: '단순', fileName: 'mini_mono_strong_deco_simple.jpg' },
    { id: 3, style: '미니멀리즘', tone: '모노톤', lighting: '부드러운 조명', focalPoint: '장식', complexity: '단순', fileName: 'mini_mono_soft_deco_simple.jpg' },
    { id: 4, style: '미니멀리즘', tone: '모노톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'mini_mono_strong_furniture_simple.jpg' },
    { id: 5, style: '미니멀리즘', tone: '뉴트럴', lighting: '은은한 조명', focalPoint: '조명', complexity: '단순', fileName: 'mini_new_euneun_light_simple.jpg' },

    // 모던 (6장)
    { id: 6, style: '모던', tone: '푸른톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'modern_blue_strong_furniture_simple.jpg' },
    { id: 7, style: '모던', tone: '푸른톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'modern_blue_strong_furniture_simple_2.jpg' },
    { id: 8, style: '모던', tone: '푸른톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'modern_blue_strong_furniture_simple_3.jpg' },
    { id: 9, style: '모던', tone: '모노톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'modern_mono_strong_furniture_simple.jpg' },
    { id: 10, style: '모던', tone: '뉴트럴', lighting: '부드러운 조명', focalPoint: '조명', complexity: '단순', fileName: 'modern_new_soft_light_simple.jpg' },
    { id: 11, style: '모던', tone: '뉴트럴', lighting: '부드러운 조명', focalPoint: '장식', complexity: '단순', fileName: 'modern_new_soft_deco_simple.jpg' },

    // 스칸디나비아 (4장)
    { id: 12, style: '스칸디나비아', tone: '푸른톤', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'scan_blue_strong_furniture_simple.jpg' },
    { id: 13, style: '스칸디나비아', tone: '모노톤', lighting: '부드러운 조명', focalPoint: '가구', complexity: '단순', fileName: 'scan_mono_soft_furniture_simple.jpg' },
    { id: 14, style: '스칸디나비아', tone: '뉴트럴', lighting: '부드러운 조명', focalPoint: '조명', complexity: '단순', fileName: 'scan_new_soft_light_simple.jpg' },
    { id: 15, style: '스칸디나비아', tone: '뉴트럴', lighting: '부드러운 조명', focalPoint: '장식', complexity: '단순', fileName: 'scan_new_soft_deco_simple.jpg' },

    // 빈티지 (7장)
    { id: 16, style: '빈티지', tone: '푸른톤', lighting: '강한 조명', focalPoint: '장식', complexity: '복잡', fileName: 'vintage_blue_strong_deco_complex.jpg' },
    { id: 17, style: '빈티지', tone: '뉴트럴', lighting: '부드러운 조명', focalPoint: '가구', complexity: '복잡', fileName: 'vintage_new_soft_furniture_complex.jpg' },
    { id: 18, style: '빈티지', tone: '포인트', lighting: '부드러운 조명', focalPoint: '가구', complexity: '복잡', fileName: 'vintage_point_soft_furniture_complex.jpg' },
    { id: 19, style: '빈티지', tone: '포인트', lighting: '부드러운 조명', focalPoint: '가구', complexity: '단순', fileName: 'vintage_point_soft_furniture_simple.jpg' },
    { id: 20, style: '빈티지', tone: '포인트', lighting: '강한 조명', focalPoint: '장식', complexity: '복잡', fileName: 'vintage_point_strong_deco_complex.jpg' },
    { id: 21, style: '빈티지', tone: '포인트', lighting: '강한 조명', focalPoint: '가구', complexity: '단순', fileName: 'vintage_point_strong_furniture_simple.jpg' },
    { id: 22, style: '빈티지', tone: '포인트', lighting: '강한 조명', focalPoint: '조명', complexity: '복잡', fileName: 'vintage_point_strong_light_complex.jpg' }
];

// ----- 질문(화면) 수, 이미지 수 설정 -----
// 15개의 질문(화면), 각 화면당 2장 → 총 30장 필요
const totalScreens = 15;
const totalImagesNeeded = totalScreens * 2; // 30장

// ----- 전역 변수 -----
let questionImages = []; // 최종 30장을 담을 배열
let currentIndex = 0;    // 현재 질문 화면 인덱스(짝수: first image, 짝수+1: second image)

// 점수 기록
let scores = {
    '모던': 0,
    '미니멀리즘': 0,
    '빈티지': 0,
    '스칸디나비아': 0
};
let featureScores = {
    'tone': {},
    'lighting': {},
    'focalPoint': {},
    'complexity': {}
};

// ----- 스타일별 메시지 등 (예시) -----
const styleMessages = {
    '모던': [
        '깔끔하고 세련된 디자인을 강조합니다.',
        '직선과 단순한 형태를 사용하여 공간을 넓게 보이게 합니다.',
        '기능성과 미니멀리즘을 결합하여 현대적인 느낌을 줍니다.'
    ],
    '미니멀리즘': [
        '불필요한 요소를 제거하여 공간을 시원하게 만듭니다.',
        '간결함과 실용성을 중시하며, 공간 활용에 초점을 맞춥니다.',
        '자연광을 최대한 활용하여 밝고 환한 분위기를 연출합니다.'
    ],
    '빈티지': [
        '과거의 매력을 현대적으로 재해석하여 아늑한 분위기를 연출합니다.',
        '고전적인 가구와 장식품을 사용하여 따뜻하고 친근한 느낌을 줍니다.',
        '다양한 텍스처와 색상을 조화롭게 배치하여 개성을 표현합니다.'
    ],
    '스칸디나비아': [
        '자연 소재와 밝은 색상을 사용하여 따뜻하고 편안한 느낌을 줍니다.',
        '기능성과 미적 요소를 결합하여 실용적이면서도 아름다운 공간을 만듭니다.',
        '자연광을 최대한 활용하여 밝고 환한 분위기를 연출합니다.'
    ]
};

// 톤, 조명, 초점, 복잡성 메시지는 원하는 대로 추가
const toneMessages = {
    '푸른톤': [
        '푸른톤은 시원하고 청량한 분위기를 제공합니다.',
        '공간을 맑고 쾌적하게 보여 줍니다.',
        '차분하면서도 생동감 있는 느낌을 주는 색조입니다.'
    ],
    '모노톤': [
        '모노톤은 깔끔하고 세련된 느낌을 줍니다.',
        '대비감이 적어 차분하고 안정적인 분위기를 만듭니다.',
        '단순함 속에서 심플한 아름다움을 추구합니다.'
    ],
    '뉴트럴': [
        '공간에 조화로운 느낌을 주며, 안정감을 높입니다.',
        '다양한 색상과 잘 어울려 어떤 인테리어에도 적합합니다.',
        '차분하고 안정적인 분위기를 연출하여 편안함을 제공합니다.'
    ],
    '포인트': [
        '공간에 생기를 불어넣고, 시각적인 흥미를 더합니다.',
        '특정 요소를 강조하여 공간의 개성을 부각시킵니다.',
        '다양한 색상과 조화를 이루어 독특한 분위기를 만들어냅니다.'
    ]
};

const lightingMessages = {
    '부드러운 조명': [
        '공간을 아늑하고 편안하게 만들어 줍니다.',
        '따뜻한 분위기를 연출하여 사람들을 편안하게 합니다.',
        '자연광이 주로 사용되며 인위적인 조명과 대비됩니다'
    ],
    '강한 조명': [
        '공간을 밝고 활기차게 만들어 줍니다.',
        '작업 공간이나 공부하는 공간에 적합합니다.',
        '백색광 등 인공조명이 주로 사용되며 자연광과 대비됩니다.'
    ],
    '은은한 조명': [
        '은은한 조명은 공간을 온화하고 우아하게 만들어 줍니다.',
        '이 조명은 실내 분위기에 부드러운 깊이를 더하고, 시야 피로를 줄여줍니다.',
        '조도를 적절히 조절해 사람들의 눈을 편안하게 하면서도 세련된 분위기를 연출할 수 있습니다.'
    ]
};

const focalPointMessages = {
    '가구': [
        '가구를 중심으로 한 인테리어는 실용성과 미적 요소를 동시에 갖춥니다.',
        '공간의 기능성을 높이고, 스타일을 강조합니다.',
        '가구는 공간의 중심이 되어 사람들의 시선을 끌어냅니다.'
    ],
    '장식': [
        '장식 요소를 강조한 인테리어는 독창적인 스타일을 드러냅니다.',
        '공간에 개성을 부여하고, 독특한 분위기를 만들어냅니다.',
        '장식은 공간의 이야기를 전달하는 중요한 요소입니다.'
    ],
    '조명': [
        '조명을 중심으로 한 인테리어는 공간의 분위기를 결정짓는 핵심입니다.',
        '공간의 기능성을 높이고, 시각적인 매력을 더합니다.',
        '조명은 공간의 모든 요소를 연결해주는 역할을 합니다.'
    ]
};

const complexityMessages = {
    '단순': [
        '공간을 깔끔하고 정돈되게 보이게 합니다.',
        '불필요한 요소를 제거하여 시각적으로 편안함을 제공합니다.',
        '단순함은 공간을 더욱 넓고 여유롭게 만들어 줍니다.'
    ],
    '복잡': [
        '개성 넘치는 공간 연출을 돕습니다.',
        '다양한 요소를 조화롭게 배치하여 독특한 분위기를 만들어냅니다.',
        '복잡함은 공간에 깊이와 흥미를 더해줍니다.'
    ]
};

// ----- generateQuestions: 22장 + 중복 8장 = 30장 구성 -----
function generateQuestions() {
    // 1) DB를 복제하고, 랜덤 섞기
    let shuffled = [...imageDatabase];
    shuffleArray(shuffled);

    // 2) 22장 전부 1회씩 questionImages에 추가
    questionImages = [...shuffled];  // 길이=22

    // 각 이미지의 사용 횟수(초기=1)
    let usageCount = {};
    for (let img of shuffled) {
        usageCount[img.id] = 1;
    }

    // 3) (30 - 22)=8장의 추가 이미지를 "이미 1회" 나온 이미지 중에서 1회 더(최대 2회)
    while (questionImages.length < totalImagesNeeded) {
        let randomIndex = Math.floor(Math.random() * shuffled.length);
        let candidate = shuffled[randomIndex];

        if (usageCount[candidate.id] < 2) {
            questionImages.push(candidate);
            usageCount[candidate.id] += 1;
        }

        // 모든 이미지가 이미 2회씩 들어갔다면 중단
        let allUsedTwice = Object.values(usageCount).every(cnt => cnt >= 2);
        if (allUsedTwice) break;
    }

    // questionImages.length = 30
    // 순서를 다시 섞고 싶으면 아래 주석 해제
    // shuffleArray(questionImages);
}

// ----- 이미지 사전 로딩 -----

// 이미지 사전 로딩
function preloadImages() {
    const loadingMessage = document.getElementById('loadingMessage');
    const imageContainer = document.getElementById('image-container');
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('h2');

    loadingMessage.style.display = 'block';

    const promises = imageDatabase.map(image => {
        const img = new Image();
        img.src = `images/${image.fileName}`;
        return new Promise((resolve) => {
            img.onload = resolve;
        });
    });

    Promise.all(promises).then(() => {
        loadingMessage.style.display = 'none';
        title.style.display = 'block';
        subtitle.style.display = 'block';
        imageContainer.style.display = 'flex';
        renderImage();
    });
}

// window.onload 초기화
window.onload = () => {
    preloadImages();
    generateQuestions();
};

// ----- renderImage: 짝수 인덱스+짝수+1 인덱스 = 한 화면 -----
function renderImage() {
    const imgElement1 = document.getElementById('styleImage');
    const imgElement2 = document.getElementById('styleImage2');

    // 모든 이미지를 다 보여줬으면 결과 표시
    if (currentIndex >= questionImages.length) {
        displayResults();
        return;
    }

    // questionImages[currentIndex], currentIndex+1 사용
    const image1 = questionImages[currentIndex];
    const image2 = questionImages[currentIndex + 1];

    // 이미지 src 설정
    imgElement1.src = `images/${image1.fileName}`;
    imgElement2.src = `images/${image2.fileName}`;

    // 클릭 핸들러 설정
    imgElement1.onclick = () => selectImage(image1);
    imgElement2.onclick = () => selectImage(image2);
}

// ----- selectImage: 사용자가 고른 이미지 점수 반영 후 다음 화면 -----
function selectImage(selectedImage) {
    // 스타일 점수
    scores[selectedImage.style] += 1;

    // 톤/조명/초점/복잡성 점수
    featureScores.tone[selectedImage.tone] = (featureScores.tone[selectedImage.tone] || 0) + 1;
    featureScores.lighting[selectedImage.lighting] = (featureScores.lighting[selectedImage.lighting] || 0) + 1;
    featureScores.focalPoint[selectedImage.focalPoint] = (featureScores.focalPoint[selectedImage.focalPoint] || 0) + 1;
    featureScores.complexity[selectedImage.complexity] = (featureScores.complexity[selectedImage.complexity] || 0) + 1;

    // 다음 화면(2장씩 소진)
    currentIndex += 2;

    // 끝났다면 결과
    if (currentIndex >= questionImages.length) {
        displayResults();
    } else {
        renderImage();
    }
}

// ----- displayResults: 최종 결과 -----
function displayResults() {
    let resultMessage = "당신의 인테리어 스타일 분석 결과\n\n";

    // 각 특성 상위 2개
    const topStyles = getTopTwoScores(scores);
    const topTones = getTopTwoScores(featureScores.tone);
    const topLightings = getTopTwoScores(featureScores.lighting);
    const topFocalPoints = getTopTwoScores(featureScores.focalPoint);
    const topComplexities = getTopTwoScores(featureScores.complexity);

    // 결과 문자열 합치기
    // 스타일
    resultMessage += `1. 스타일 (${topStyles[0]?.key || '없음'}) - ${(styleMessages[topStyles[0]?.key] || []).join(' ')}\n`;
    resultMessage += `   스타일 (${topStyles[1]?.key || '없음'}) - ${(styleMessages[topStyles[1]?.key] || []).join(' ')}\n\n`;

    // 톤
    resultMessage += `2. 톤 (${topTones[0]?.key || '없음'}) - ${(toneMessages[topTones[0]?.key] || []).join(' ')}\n`;
    resultMessage += `   톤 (${topTones[1]?.key || '없음'}) - ${(toneMessages[topTones[1]?.key] || []).join(' ')}\n\n`;

    // 조명
    resultMessage += `3. 조명 (${topLightings[0]?.key || '없음'}) - ${(lightingMessages[topLightings[0]?.key] || []).join(' ')}\n`;
    resultMessage += `   조명 (${topLightings[1]?.key || '없음'}) - ${(lightingMessages[topLightings[1]?.key] || []).join(' ')}\n\n`;

    // 초점
    resultMessage += `4. 초점 포인트 (${topFocalPoints[0]?.key || '없음'}) - ${(focalPointMessages[topFocalPoints[0]?.key] || []).join(' ')}\n`;
    resultMessage += `   초점 포인트 (${topFocalPoints[1]?.key || '없음'}) - ${(focalPointMessages[topFocalPoints[1]?.key] || []).join(' ')}\n\n`;

    // 복잡성
    resultMessage += `5. 복잡성 (${topComplexities[0]?.key || '없음'}) - ${(complexityMessages[topComplexities[0]?.key] || []).join(' ')}\n`;
    resultMessage += `   복잡성 (${topComplexities[1]?.key || '없음'}) - ${(complexityMessages[topComplexities[1]?.key] || []).join(' ')}\n\n`;

    // localStorage에 저장
    localStorage.setItem('finalResults', JSON.stringify({
        style: [topStyles[0]?.key || '없음', topStyles[1]?.key || '없음'],
        tone: [topTones[0]?.key || '없음', topTones[1]?.key || '없음'],
        lighting: [topLightings[0]?.key || '없음', topLightings[1]?.key || '없음'],
        focalPoint: [topFocalPoints[0]?.key || '없음', topFocalPoints[1]?.key || '없음'],
        complexity: [topComplexities[0]?.key || '없음', topComplexities[1]?.key || '없음'],
        message: resultMessage
    }));


    // result.html 이동 (결과 페이지)
    window.location.href = 'result.html';
}

// ----- getTopTwoScores: 가장 높은 2개 뽑기 -----
function getTopTwoScores(obj) {
    let sorted = Object.entries(obj)
        .map(([k,v]) => ({ key: k, value: v }))
        .sort((a, b) => b.value - a.value);
    return sorted.slice(0, 2);
}

// ----- 배열 랜덤 섞기 -----
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ----- window.onload 초기화 -----
window.onload = () => {
    preloadImages();    // 이미지 사전 로딩
    generateQuestions(); // questionImages = 30장 구성
    // renderImage()는 preload 완료 후 호출됨 (preloadImages 내부)
};
