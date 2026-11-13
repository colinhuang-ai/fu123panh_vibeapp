import pptxgen from "pptxgenjs";
import { LessonProject } from "../types/lesson";

/**
 * Generates and downloads a modern PPTX presentation using pptxgenjs
 */
export async function exportToPPTX(project: LessonProject) {
  const pptx = new pptxgen();

  // Configure presentation properties
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "LessonForge AI";
  pptx.title = project.metadata.topic;
  pptx.subject = `${project.metadata.gradeLevel} - ${project.metadata.targetAudience}`;

  // 1. Title Slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "0F172A" }; // Slate 900

  // Decorative accent line
  titleSlide.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 1.5,
    w: 0.15,
    h: 3.8,
    fill: { color: "0E8CE9" }, // Brand blue
  });

  // Category / Grade Badge
  titleSlide.addText(
    `${project.metadata.gradeLevel.toUpperCase()} • ${project.metadata.language.toUpperCase()}`,
    {
      x: 1.2,
      y: 1.5,
      w: 10.5,
      h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: "38A8F6",
      bold: true,
      charSpacing: 2,
    }
  );

  // Main Title
  titleSlide.addText(project.metadata.topic, {
    x: 1.2,
    y: 2.1,
    w: 10.5,
    h: 1.8,
    fontSize: 34,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    wrap: true,
  });

  // Target audience & notes
  titleSlide.addText(
    `Đối tượng: ${project.metadata.targetAudience}\nThời lượng: ${project.metadata.duration || "45 phút"} • Phong cách: ${project.metadata.tone || "Chuẩn Sư Phạm"}`,
    {
      x: 1.2,
      y: 4.1,
      w: 10.5,
      h: 1.0,
      fontSize: 14,
      fontFace: "Arial",
      color: "94A3B8",
      lineSpacing: 22,
    }
  );

  // Footer branding
  titleSlide.addText("Được tạo bởi LessonForge — AI EdTech Studio", {
    x: 1.2,
    y: 6.4,
    w: 10.5,
    h: 0.4,
    fontSize: 11,
    fontFace: "Arial",
    color: "64748B",
  });

  // 2. Content Slides
  project.slides.forEach((slideData) => {
    const slide = pptx.addSlide();
    slide.background = { color: "F8FAFC" }; // Slate 50

    // Top Header Banner
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 1.1,
      fill: { color: "FFFFFF" },
      line: { color: "E2E8F0", width: 1 },
    });

    // Slide Number Tag
    slide.addText(`SLIDE ${slideData.slideNumber}`, {
      x: 0.8,
      y: 0.2,
      w: 2.5,
      h: 0.3,
      fontSize: 11,
      fontFace: "Arial",
      color: "0E8CE9",
      bold: true,
    });

    // Slide Title
    slide.addText(slideData.title, {
      x: 0.8,
      y: 0.45,
      w: 11.5,
      h: 0.55,
      fontSize: 20,
      fontFace: "Arial",
      color: "0F172A",
      bold: true,
    });

    // Left Column: Key Bullet Points Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.4,
      w: 7.2,
      h: 5.2,
      fill: { color: "FFFFFF" },
      line: { color: "E2E8F0", width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("NỘI DUNG TRỌNG TÂM", {
      x: 1.1,
      y: 1.6,
      w: 6.6,
      h: 0.3,
      fontSize: 12,
      fontFace: "Arial",
      color: "64748B",
      bold: true,
    });

    // Bullet items
    const bulletItems = slideData.bullets.map((b) => ({
      text: b,
      options: {
        fontSize: 14,
        color: "1E293B",
        bullet: { code: "2022" },
        lineSpacing: 22,
        breakLine: true,
      },
    }));

    slide.addText(bulletItems, {
      x: 1.1,
      y: 2.0,
      w: 6.6,
      h: 4.3,
      fontFace: "Arial",
      valign: "top",
    });

    // Right Column: Visual Prompt Suggestion Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 8.3,
      y: 1.4,
      w: 4.2,
      h: 5.2,
      fill: { color: "EFF6FF" }, // Brand 50
      line: { color: "BFDBFE", width: 1 },
      rectRadius: 0.1,
    });

    slide.addText("💡 GỢI Ý MINH HỌA (VISUAL CONCEPT)", {
      x: 8.6,
      y: 1.6,
      w: 3.6,
      h: 0.4,
      fontSize: 11,
      fontFace: "Arial",
      color: "1D4ED8",
      bold: true,
    });

    slide.addText(slideData.visualPrompt, {
      x: 8.6,
      y: 2.1,
      w: 3.6,
      h: 2.8,
      fontSize: 12,
      fontFace: "Arial",
      color: "334155",
      italic: true,
      valign: "top",
      lineSpacing: 18,
    });

    // Right Bottom: Metadata indicator
    slide.addText(`Bài giảng: ${project.metadata.topic}\nLessonForge Studio`, {
      x: 8.6,
      y: 5.8,
      w: 3.6,
      h: 0.6,
      fontSize: 10,
      fontFace: "Arial",
      color: "94A3B8",
    });

    // Add Speaker Notes directly into PPTX
    if (slideData.speakerNotes) {
      slide.addNotes(`[LỜI GIẢNG / SPEAKER NOTES]:\n${slideData.speakerNotes}`);
    }
  });

  // Save the PPTX file
  const safeFilename = `${project.metadata.topic.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, "_")}_Slides.pptx`;
  await pptx.writeFile({ fileName: safeFilename });
}

/**
 * Export Slides as Markdown (Marp-compatible)
 */
export function exportSlidesMarkdown(project: LessonProject): string {
  let md = `---
marp: true
theme: default
paginate: true
header: "${project.metadata.topic} — ${project.metadata.gradeLevel}"
footer: "LessonForge EdTech Studio"
---

# ${project.metadata.topic}
**Cấp độ:** ${project.metadata.gradeLevel}  
**Đối tượng:** ${project.metadata.targetAudience}  
**Ngôn ngữ:** ${project.metadata.language}

---
`;

  project.slides.forEach((s) => {
    md += `\n<!-- Slide ${s.slideNumber} -->\n## ${s.title}\n\n`;
    s.bullets.forEach((b) => {
      md += `- ${b}\n`;
    });
    md += `\n> **Visual Prompt:** *${s.visualPrompt}*\n\n`;
    md += `<!-- Speaker Notes:\n${s.speakerNotes}\n-->\n\n---\n`;
  });

  return md;
}

/**
 * Export Video Script as Markdown
 */
export function exportScriptMarkdown(project: LessonProject): string {
  let md = `# Kịch Bản Video Bài Giảng: ${project.metadata.topic}\n`;
  md += `**Thời lượng ước tính:** ${project.videoScript.reduce((acc, c) => acc + (c.durationSeconds || 0), 0)} giây\n\n`;
  md += `| Mốc thời gian | Phân cảnh / Visual Cue | Lời bình (Voiceover Script) |\n`;
  md += `| :--- | :--- | :--- |\n`;

  project.videoScript.forEach((item) => {
    md += `| **${item.timestamp}** | *${item.visualCue.replace(/\|/g, "-")}* | ${item.voiceover.replace(/\|/g, "-")} |\n`;
  });

  return md;
}

/**
 * Export Video Script as SRT Subtitles
 */
export function exportScriptSRT(project: LessonProject): string {
  let srt = "";
  let currentSecond = 0;

  project.videoScript.forEach((item, index) => {
    const startSec = currentSecond;
    const endSec = currentSecond + (item.durationSeconds || 30);
    currentSecond = endSec;

    const formatTime = (secs: number) => {
      const h = Math.floor(secs / 3600).toString().padStart(2, "0");
      const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
      const s = Math.floor(secs % 60).toString().padStart(2, "0");
      return `${h}:${m}:${s},000`;
    };

    srt += `${index + 1}\n`;
    srt += `${formatTime(startSec)} --> ${formatTime(endSec)}\n`;
    srt += `[${item.visualCue}]\n`;
    srt += `${item.voiceover}\n\n`;
  });

  return srt;
}

/**
 * Export Quiz in Quizizz spreadsheet bulk import CSV format
 */
export function exportQuizizzCSV(project: LessonProject): string {
  // Quizizz CSV header format
  let csv = "Question Text,Question Type,Option 1,Option 2,Option 3,Option 4,Correct Answer,Time in seconds,Image Link\n";

  project.quiz.forEach((q) => {
    const qText = `"${q.question.replace(/"/g, '""')}"`;
    const opts = q.options.map((opt) => `"${opt.replace(/"/g, '""')}"`);
    while (opts.length < 4) opts.push('""');
    const correctNum = q.correctIndex + 1; // 1-based index in Quizizz

    csv += `${qText},Multiple Choice,${opts[0]},${opts[1]},${opts[2]},${opts[3]},${correctNum},30,\n`;
  });

  return csv;
}

/**
 * Export Quiz in Google Forms / Spreadsheet CSV format
 */
export function exportGoogleFormsCSV(project: LessonProject): string {
  let csv = "STT,Câu Hỏi,Lựa Chọn A,Lựa Chọn B,Lựa Chọn C,Lựa Chọn D,Đáp Án Đúng,Giải Thích Chi Tiết\n";

  project.quiz.forEach((q, idx) => {
    const qText = `"${q.question.replace(/"/g, '""')}"`;
    const opts = q.options.map((opt) => `"${opt.replace(/"/g, '""')}"`);
    while (opts.length < 4) opts.push('""');
    const correctLetter = ["A", "B", "C", "D"][q.correctIndex] || "A";
    const expl = `"${q.explanation.replace(/"/g, '""')}"`;

    csv += `${idx + 1},${qText},${opts[0]},${opts[1]},${opts[2]},${opts[3]},${correctLetter},${expl}\n`;
  });

  return csv;
}

/**
 * Export Flashcards as Anki Tab-Separated CSV
 */
export function exportAnkiCSV(project: LessonProject): string {
  let tsv = "#separator:tab\n#html:true\n#tags column:4\n";

  project.flashcards.forEach((card) => {
    const front = card.front.replace(/\t/g, " ").replace(/\n/g, "<br>");
    const back = card.back.replace(/\t/g, " ").replace(/\n/g, "<br>");
    const hint = card.mnemonicCue.replace(/\t/g, " ").replace(/\n/g, "<br>");
    const tag = project.metadata.topic.replace(/\s+/g, "_");

    tsv += `${front}\t${back}\t💡 Gợi nhớ: ${hint}\t${tag}\n`;
  });

  return tsv;
}

/**
 * Export Exercises & Rubrics as formatted Markdown
 */
export function exportExercisesWorksheet(project: LessonProject, includeSolutions: boolean): string {
  let md = `# ${includeSolutions ? "HƯỚNG DẪN CHẤM & ĐÁP ÁN BÀI TẬP" : "PHIẾU BÀI TẬP DỰ ÁN & VẬN DỤNG"}\n`;
  md += `**Chủ đề:** ${project.metadata.topic} | **Lớp:** ${project.metadata.gradeLevel}\n\n---\n\n`;

  project.exercises.forEach((ex, idx) => {
    const typeLabel = ex.type === "analysis" ? "Phân tích số liệu" : ex.type === "case_study" ? "Nghiên cứu tình huống" : "Dự án STEM";
    md += `## Bài tập ${idx + 1}: ${ex.title} [Dạng: ${typeLabel}]\n\n`;
    md += `### Đề bài:\n${ex.prompt}\n\n`;

    md += `### Thang điểm đánh giá (Rubric):\n`;
    md += `| Tiêu chí đánh giá | Điểm tối đa |\n`;
    md += `| :--- | :---: |\n`;
    ex.rubric.forEach((r) => {
      md += `| ${r.criteria} | **${r.points} điểm** |\n`;
    });
    md += `\n`;

    if (includeSolutions) {
      md += `### Lời giải mẫu & Hướng dẫn sư phạm:\n`;
      md += `${ex.sampleAnswer}\n\n`;
    }

    md += `---\n\n`;
  });

  return md;
}

/**
 * Utility helper to trigger text file download in browser
 */
export function downloadFile(content: string, filename: string, mimeType: string = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
