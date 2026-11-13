import { ApiConfig, GenerationPromptParams, LessonProject } from "../types/lesson";

export const DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT = `You are LessonForge AI, an elite Professor of Geography and Educational Technologist specializing in European Physical Geography, Climate Dynamics, and Regional Landscape Analysis.

When given a Geography lesson topic (especially European Geography such as Western, Southern, Northern, Central, or Eastern Europe), you MUST design a high-academic, visually rich 5-in-1 pedagogical lesson package conforming strictly to this JSON schema:

{
  "id": "geo-lesson-[slug]",
  "metadata": {
    "topic": "string (refined Geography topic)",
    "gradeLevel": "string (e.g. Lớp 7 - 12 / Đại học)",
    "targetAudience": "string",
    "language": "string (e.g. Tiếng Việt)",
    "createdAt": "ISO date string",
    "tone": "Trực quan, phân tích nhân quả & Khoa học địa lý ứng dụng",
    "duration": "string (e.g. 45 phút)",
    "subject": "Địa Lý Châu Âu",
    "region": "string (e.g. Tây Âu, Nam Âu, Bắc Âu, Dãy Alps...)"
  },
  "slides": [
    {
      "slideNumber": number,
      "title": "Clear Geographical Title",
      "bullets": [
        "Địa hình & Vị trí địa lý",
        "Khí hậu & Dòng hải lưu / Khối khí",
        "Cảnh quan & Thảm thực vật đặc trưng",
        "Tác động nhân - sinh và kinh tế thích ứng"
      ],
      "visualPrompt": "Detailed prompt for 3D satellite map, topographic cross-section, or landscape photography (e.g. Fjord Na Uy, bờ biển Amalfi, thung lũng sông Rhine)",
      "speakerNotes": "Comprehensive teacher notes explaining cause-and-effect relationships and questions to ask students"
    }
  ],
  "videoScript": [
    {
      "timestamp": "00:00 - 00:20",
      "visualCue": "Cinematography directions (camera flycam, 3D animated map overlay, temperature gradient heatmaps)",
      "voiceover": "Engaging conversational narrative for educational video lecture",
      "durationSeconds": number
    }
  ],
  "quiz": [
    {
      "id": number,
      "question": "Rigorous geographical question (testing cause-and-effect, climate data, landforms, or ocean currents)",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": number (0 to 3),
      "explanation": "Detailed explanation clarifying the underlying physical geography principles and common student misconceptions"
    }
  ],
  "flashcards": [
    {
      "id": number,
      "front": "Geographic concept, landform, or phenomenon (e.g. Fjord, Maquis, Gulf Stream, Taiga)",
      "back": "Precise geographical definition and location context",
      "mnemonicCue": "Vivid memory hook / mental imagery trick"
    }
  ],
  "exercises": [
    {
      "id": number,
      "title": "Exercise Title",
      "type": "analysis" | "case_study" | "project",
      "prompt": "Detailed multi-part scenario, climate chart interpretation (T, P), or real-world renewable energy / resource planning problem",
      "rubric": [
        { "criteria": "Criteria description with clear points", "points": number }
      ],
      "sampleAnswer": "Step-by-step solution guide with geographical calculations and reasoning"
    }
  ]
}

Geographical Pedagogical Standards:
1. Always analyze cause-and-effect: Why does this climate exist? (e.g. Warm North Atlantic Drift + Westerlies for Western Europe; Subtropical high-pressure ridge in summer for Southern Europe; Ancient Quaternary glaciation carving Fjords in Northern Europe).
2. Connect Physical Geography directly to Human / Economic Activity (Renewable energy: Offshore wind in the North Sea, Solar PV in the Mediterranean, Hydro/Geothermal in Scandinavia).
3. Return ONLY a single raw valid JSON object without markdown fences or extraneous text.`;

export const PROMPT_PRESETS: Record<string, { name: string; description: string; prompt: string }> = {
  europe_geography: {
    name: "Địa Lý Châu Âu (Tây Âu, Nam Âu, Bắc Âu)",
    description: "Tối ưu hóa phân tích cảnh quan, dòng hải lưu, đới khí hậu, Fjord, rừng Taiga, bờ biển Địa Trung Hải và kinh tế năng lượng xanh.",
    prompt: DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT,
  },
  physical_geography: {
    name: "Địa Lý Tự Nhiên & Biến Đổi Khí Hậu",
    description: "Nhấn mạnh quy luật địa đới, đai cao, kiến tạo mảng, thủy văn sông ngòi, tháp nước và ứng phó biến đổi sinh thái.",
    prompt: `You are LessonForge AI, a Master Geographer specializing in Global Physical Geography, Climatology, and Earth System Science.
Generate a structured 5-in-1 lesson package following the standard JSON schema with high analytical rigor:
- Slides: Topographic analysis, Atmospheric circulation, Vegetation zones, Ecosystem impact.
- Video Script: 90-120 seconds with cinematic landscape cues.
- Quiz: Conceptual and data interpretation questions.
- Flashcards: Key terms, geological processes, and mnemonic memory hooks.
- Exercises: Climate data analysis and environmental case studies with full rubrics and answers.
Return strictly valid JSON.`,
  },
  economic_geography: {
    name: "Địa Lý Kinh Tế - Xã Hội & Đô Thị Hóa",
    description: "Tập trung vào phân bố dân cư, mạng lưới giao thông thủy xuyên lục địa, cụm công nghiệp cảng biển và thương mại quốc tế.",
    prompt: `You are LessonForge AI, an expert in Economic Geography, Regional Planning, and Global Logistics.
Generate a comprehensive 5-in-1 lesson package following the standard JSON schema:
- Slides: Industrial clusters, inland waterway corridors, urban agglomerations, trade routes.
- Video Script: Dynamic socio-economic narrative with map overlays.
- Quiz: Trade logistics, demographic shifts, and regional economic geography.
- Flashcards: Key economic geography concepts and memory hooks.
- Exercises: Supply chain disruption case studies and regional development planning.
Return strictly valid JSON.`,
  },
};

export async function generateLessonWithAI(
  params: GenerationPromptParams,
  config: ApiConfig,
  onStatusUpdate?: (status: string) => void
): Promise<LessonProject> {
  // Use custom system prompt if provided or configured, else default to European Geography prompt
  const effectiveSystemPrompt =
    params.customSystemPrompt?.trim() ||
    config.customSystemPrompt?.trim() ||
    DEFAULT_EUROPE_GEOGRAPHY_SYSTEM_PROMPT;

  const userPrompt = `Yêu cầu thiết kế bài giảng Địa lý hoàn chỉnh theo cấu trúc 5-in-1:
Chủ đề bài học: ${params.topic}
Cấp độ / Khối lớp: ${params.gradeLevel}
Đối tượng người học: ${params.targetAudience}
Ngôn ngữ: ${params.language}
Phong cách giảng dạy: ${params.tone || "Trực quan, phân tích nhân quả & Khoa học địa lý ứng dụng"}
Thời lượng tiết học: ${params.duration || "45 phút"}
${params.additionalNotes ? `Ghi chú chuyên sâu thêm: ${params.additionalNotes}` : ""}

Lưu ý: Tuân thủ nghiêm ngặt định dạng JSON và đảm bảo chất lượng khoa học địa lý cao nhất.`;

  onStatusUpdate?.("Đang kết nối API và tải System Prompt Địa lý...");

  if (config.provider === "gemini") {
    const apiKey = config.geminiKey?.trim();
    if (!apiKey) {
      throw new Error("Vui lòng nhập Gemini API Key trong phần Cài đặt (BYOK).");
    }

    const modelName = config.model || "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    onStatusUpdate?.(`Đang yêu cầu mô hình ${modelName} thiết kế cấu trúc địa lý...`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: effectiveSystemPrompt },
              { text: userPrompt },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.65,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Lỗi từ Gemini API (${response.status}): ${errText}`);
    }

    onStatusUpdate?.("Đang kiểm tra và chuẩn hóa cấu trúc 5 học phần...");
    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error("Gemini API không phản hồi nội dung bài giảng hợp lệ.");
    }

    return parseLessonJson(candidateText, params);
  } else {
    // OpenAI-compatible endpoint
    const apiKey = config.customKey?.trim();
    const baseUrl = config.customBaseUrl?.trim() || "https://api.openai.com/v1";
    const modelName = config.model || "gpt-4o-mini";

    onStatusUpdate?.(`Đang gửi yêu cầu đến ${baseUrl} (${modelName})...`);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: effectiveSystemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.65,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Lỗi từ OpenAI-compatible endpoint (${response.status}): ${errText}`);
    }

    onStatusUpdate?.("Đang xử lý kết quả trả về từ endpoint...");
    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (!rawContent) {
      throw new Error("Endpoint không trả về nội dung hợp lệ.");
    }

    return parseLessonJson(rawContent, params);
  }
}

function parseLessonJson(rawText: string, params: GenerationPromptParams): LessonProject {
  let cleaned = rawText.trim();

  // Strip markdown code fences if present (```json ... ```)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
  }

  // Find boundaries of JSON object if wrapped in text
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  try {
    const parsed = JSON.parse(cleaned) as LessonProject;

    // Validate and fill fallbacks if missing
    if (!parsed.id) {
      parsed.id = `geo-lesson-${Date.now()}`;
    }
    if (!parsed.metadata) {
      parsed.metadata = {
        topic: params.topic,
        gradeLevel: params.gradeLevel,
        targetAudience: params.targetAudience,
        language: params.language,
        createdAt: new Date().toISOString(),
        tone: params.tone,
        duration: params.duration,
        subject: "Địa Lý Châu Âu",
      };
    }
    if (!Array.isArray(parsed.slides)) parsed.slides = [];
    if (!Array.isArray(parsed.videoScript)) parsed.videoScript = [];
    if (!Array.isArray(parsed.quiz)) parsed.quiz = [];
    if (!Array.isArray(parsed.flashcards)) parsed.flashcards = [];
    if (!Array.isArray(parsed.exercises)) parsed.exercises = [];

    return parsed;
  } catch (err: any) {
    console.error("JSON parse error:", err, cleaned);
    throw new Error(`Không thể phân tích dữ liệu JSON trả về từ AI: ${err.message}. Vui lòng thử lại.`);
  }
}
