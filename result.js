// localStorage에서 결과 가져오기
const results = JSON.parse(localStorage.getItem('finalResults'));

const resultContainer = document.getElementById('resultContainer');

// 스타일 적용 (양쪽 여백 50px 추가)
resultContainer.style.marginLeft = "50px";
resultContainer.style.marginRight = "50px";


/* 
  조명, 인테리어 포인트, 복잡성 
  각각 선택된 값에 따라 보여줄 이미지 매핑 객체
*/
const lightingImageMap = {
  '부드러운 조명': '부드러운조명.jpg',
  '강한 조명': '강한조명.jpg',
  '은은한 조명': '은은한조명.jpg'
};

const focalPointImageMap = {
  '가구': '가구.jpg',
  '장식': '장식.jpg',
  '조명': '조명.jpg'
};

const complexityImageMap = {
  '단순': '단순.jpg',
  '복잡': '복잡.jpg'
};

// 스타일과 톤 조합에 따른 파일명 매핑 함수 (기존과 동일)
function getArtistImage(style, tone) {
  const styleMap = {
    '미니멀리즘': 'mini',
    '모던': 'modern',
    '스칸디나비아': 'scan',
    '빈티지': 'vintage'
  };

  const toneMap = {
    '푸른톤': 'blue',
    '모노톤': 'mono',
    '뉴트럴': 'neutral',
    '포인트': 'point'
  };

  const stylePrefix = styleMap[style] || 'default';
  const tonePrefix = toneMap[tone] || 'neutral';

  return `${stylePrefix}_${tonePrefix}.jpg`;
}

// "1순위"와 "2순위"만 붉게 표시하기 위한 함수
function getRankNumberTitle(index) {
  if (index === 0) {
    return '<span style="color: red;">1순위</span>';  // 1순위만 빨간색
  } else if (index === 1) {
    return '<span style="color: red;">2순위</span>';  // 2순위만 빨간색
  } else {
    // 그 외 순위 (3순위 이상)인 경우 표시 안 하거나 자유롭게
    return `${index + 1}순위`;
  }
}

if (results && results.style && results.style.length > 0) {
  let resultText = `<div class="results-container">`;

  // 스타일(Top 2개) 순위화하여 표시
  for (let i = 0; i < results.style.length; i++) {
    const style = results.style[i];
    if (style === '없음') continue;  // '없음'이면 표시 생략

    // 순위 문자열 (1순위, 2순위) 처리
    const rankNumberTitle = getRankNumberTitle(i);

    // 톤 매핑 (인덱스 i에 맞는 톤)
    const tone = (results.tone && results.tone[i]) ? results.tone[i] : '뉴트럴';
    const artistImage = getArtistImage(style, tone);

    // 스타일 섹션(가로로 배치)
    resultText += `
      <div class="result-section" 
           style="display:flex; align-items:center; gap:30px; margin-bottom:40px; justify-content:center;">
        <div class="result-text" style="text-align:center;">
          <p>
            <!-- 1순위 / 2순위만 빨간색, 나머지 텍스트는 기본색상 -->
            <strong>
              ${rankNumberTitle} 추천 인테리어 스타일
            </strong>: 
            <span style="color: yellow;">${style}</span>
          </p>
          <p>
            ${style} 스타일은 ${styleMessages[style]?.join(' ') || '정보 없음'}
          </p>
          <p>
            <strong>추천 톤</strong>: 
            <span style="color: yellow;">${tone}</span>
          </p>
          <p>
            ${tone} 톤은 ${toneMessages[tone]?.join(' ') || '정보 없음'}
          </p>
        </div>
        <div class="result-image">
          <img src="${artistImage}" alt="${style} 스타일 이미지" 
               style="width:450px; height:350px; object-fit:cover; margin-bottom:20px; border-radius:20px;">
        </div>
      </div>
    `;
  }
  resultText += `</div>`;

  // ========================================================================
  // 조명(lighting), 인테리어 포인트(focalPoint), 복잡성(complexity)
  // 각각 한 줄 전체 사용하되, 폭 70%만 차지 + 중앙 정렬 + 이미지를 '문구 위'에 표시
  // ========================================================================

  // 1) 조명
  // 1) 조명
if (results.lighting) {
    const lightingArr = Array.isArray(results.lighting) ? results.lighting : [results.lighting];
    const bestLighting = lightingArr[0];
    if (bestLighting) {
        const lightingMessage = lightingMessages[bestLighting]?.join(' ') || '정보 없음';
        let lightingRecommendLine = "";
        
        // 각 조명 타입별 추가 문구 예시
        if (bestLighting === "부드러운 조명") {
            lightingRecommendLine = "부드러운 조명을 선호하는 분께 추천! <br> 아늑하고 따뜻한 분위기를 좋아하는 사람에게 잘 어울립니다.";
        } else if (bestLighting === "강한 조명") {
            lightingRecommendLine = "강한 조명을 선호하는 분께 추천! <br> 활동적인 공간을 선호하며 밝고 선명한 환경을 좋아하는 분에게 어울립니다.";
        } else if (bestLighting === "은은한 조명") {
            lightingRecommendLine = "은은한 조명을 선호하는 분께 추천! <br> 온화하고 우아한 공간 연출을 좋아하는 분에게 잘 맞습니다.";
        } else {
            lightingRecommendLine = "이런 조명을 선호하는 분께 추천! <br> 공간의 밝기와 분위기를 중요하게 생각하는 분에게 잘 어울립니다.";
        }

        // 이미지 파일 (lightingImageMap에서 가져온다고 가정)
        const lightingImg = lightingImageMap[bestLighting] || 'default.jpg';

        resultText += `
            <div class="result-section" style="width:100%; margin:0 auto; margin-bottom:40px;">
                <div class="result-text" style="text-align:center;">
                    <!-- 이미지 크기를 600x400으로 2배 확대 -->
                    <img src="${lightingImg}" alt="${bestLighting}" class="oneimg"
                         style="width:450px; height:350px; object-fit:contain; margin-bottom:15px; border-radius:20px;">
                    
                    <p><strong>조명</strong></p>
                    <p>당신의 조명 선호는 <span style="color: yellow;">${bestLighting}</span>입니다.</p>
                    <p>${lightingMessage}</p>
                    <p style="margin-top: 10px; font-style: italic;">
                        ${lightingRecommendLine}
                    </p>
                </div>
            </div>
        `;
    }
}


  // 2) 인테리어 포인트 (초점 포인트)
  if (results.focalPoint) {
    const focalPointArr = Array.isArray(results.focalPoint) ? results.focalPoint : [results.focalPoint];
    const bestFocalPoint = focalPointArr[0]; // 1순위만
    if (bestFocalPoint) {
      const focalMsg = focalPointMessages[bestFocalPoint]?.join(' ') || '정보 없음';

      let focalRecommendLine = "";
      if (bestFocalPoint === "가구") {
        focalRecommendLine = "가구를 중심으로 꾸미는 걸 좋아하는 분께 추천! <br> 실용성과 멋을 동시에 추구하는 성향이 있어요.";
      } else if (bestFocalPoint === "장식") {
        focalRecommendLine = "장식을 중심으로 공간을 꾸미는 걸 좋아하는 분께 추천! <br> 독창적인 아이템으로 개성을 드러내고 싶어하는 분에게 어울립니다.";
      } else if (bestFocalPoint === "조명") {
        focalRecommendLine = "조명을 주요 포인트로 생각하는 분께 추천! <br> 조명의 분위기 변화로 공간의 색다른 매력을 즐기고 싶어하는 분에게 제격입니다.";
      } else {
        focalRecommendLine = "이런 인테리어 포인트를 좋아하는 분께 추천! <br> 특정 요소를 돋보이게 하여 독특한 스타일을 연출하길 원하시는 분에게 잘 어울립니다.";
      }

      // 이미지 파일
      const focalImg = focalPointImageMap[bestFocalPoint] || 'default.jpg';

      resultText += `
        <div class="result-section" style="width: 100%; margin:0 auto; margin-bottom:40px;">
          <div class="result-text" style="text-align:center;">
            <!-- 먼저 이미지 표시 -->
            <img src="${focalImg}" alt="${bestFocalPoint}" class="oneimg"
                 style="width:450px; height:350px; object-fit:cover; margin-bottom:15px; border-radius:20px;">

            <p><strong>인테리어 포인트</strong></p>
            <p>당신의 인테리어 포인트는 <span style="color: yellow;">${bestFocalPoint}</span>입니다.</p>
            <p>${focalMsg}</p>
            <!-- 추가된 한 문장 추천 -->
            <p style="margin-top: 10px; font-style: italic;">
              ${focalRecommendLine}
            </p>
          </div>
        </div>
      `;
    }
  }

  // 3) 복잡성
  if (results.complexity) {
    const complexityArr = Array.isArray(results.complexity) ? results.complexity : [results.complexity];
    const bestComplexity = complexityArr[0]; // 1순위만
    if (bestComplexity) {
      const complexMsg = complexityMessages[bestComplexity]?.join(' ') || '정보 없음';

      let complexityRecommendLine = "";
      if (bestComplexity === "단순") {
        complexityRecommendLine = "심플하고 정돈된 공간을 좋아하는 분께 추천! <br> 군더더기 없이 깔끔한 라이프스타일을 추구하는 경향이 있습니다.";
      } else if (bestComplexity === "복잡") {
        complexityRecommendLine = "다채로운 요소가 가득한 공간을 좋아하는 분께 추천! <br> 개성 있고 풍부한 분위기를 원하는 분에게 잘 맞습니다.";
      } else {
        complexityRecommendLine = "이런 복잡성을 선호하는 분께 추천! <br> 개인의 감성과 개성을 다양하게 표현하고 싶은 분에게 어울립니다.";
      }

      // 이미지 파일
      const complexityImg = complexityImageMap[bestComplexity] || 'default.jpg';

      resultText += `
        <div class="result-section" style="width:100%; margin:0 auto; margin-bottom:40px;">
          <div class="result-text" style="text-align:center;">
            <!-- 먼저 이미지 표시 -->
            <img src="${complexityImg}" alt="${bestComplexity}"
                 style="width:450px; height:350px; object-fit:cover; margin-bottom:15px; border-radius:20px;">

            <p><strong>복잡성</strong></p>
            <p>당신의 복잡성 선호는 <span style="color: yellow;">${bestComplexity}</span>입니다.</p>
            <p>${complexMsg}</p>
            <!-- 추가된 한 문장 추천 -->
            <p style="margin-top: 10px; font-style: italic;">
              ${complexityRecommendLine}
            </p>
          </div>
        </div>
      `;
    }
  }

  // 결과 적용
  resultContainer.innerHTML = resultText;

} else {
  // 결과가 없으면 안내 메시지 표시
  resultContainer.innerHTML = '<p>결과가 없습니다.</p>';
}
