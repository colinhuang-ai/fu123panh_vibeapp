# LessonForge (Máy Soạn Bài Giảng Toàn Diện)

**LessonForge** là ứng dụng EdTech Web hiện đại giúp giảng viên, giáo viên và nhà giáo dục tự động thiết kế, biên tập trực quan và xuất bản đồng bộ **5 học phần sư phạm cốt lõi (5 Core Pedagogical Artifacts)** chỉ từ một chủ đề bài giảng duy nhất:

1. **Slide Deck (Bài trình chiếu):** Trực quan hóa slide 16:9, chỉnh sửa nội dung/bullet, visual prompt, ghi chú giảng viên (speaker notes), chế độ Presenter Mode toàn màn hình và **xuất file PowerPoint (.PPTX)** trực tiếp bằng `pptxgenjs` & Marp Markdown.
2. **Video Script & Teleprompter:** Kịch bản đạo diễn chia cột thời gian, Visual Cue và Voiceover, máy nhắc chữ **Teleprompter toàn màn hình** (điều chỉnh tốc độ cuộn, cỡ chữ, chế độ lật gương quang học Mirror View), đọc thử giọng AI (Web Speech API), xuất **phụ đề .SRT** và Markdown.
3. **Interactive Quiz (Trắc nghiệm tương tác):** Chế độ học sinh làm bài test trực tiếp, tính điểm tự động, giải thích sư phạm chuyên sâu, hiệu ứng pháo hoa chúc mừng (`canvas-confetti`), chế độ giáo viên biên tập đáp án, xuất file **Quizizz (.CSV)**, **Google Forms (.CSV)** và in đề thi.
4. **Flashcard Deck (Thẻ ghi nhớ Spaced Repetition):** Thẻ lật 3D tương tác mặt trước/mặt sau, mẹo nhớ **Mnemonic Cue**, cơ chế đánh giá trí nhớ ngắt quãng (Leitner System: Chưa nhớ / Hơi khó / Đã nhớ / Rất dễ), thanh theo dõi tỷ lệ thuộc bài và xuất tệp **Anki (.TXT / CSV)**.
5. **Exercises & Rubrics (Bài tập & Thang điểm đánh giá):** Phân loại theo Phân tích số liệu (`analysis`), Nghiên cứu tình huống (`case_study`), Dự án STEM (`project`), thang chấm Rubric mở rộng kèm công cụ tính điểm tự động cho giáo viên, đáp án mẫu chi tiết và chế độ xuất **Phiếu bài tập học sinh** (ẩn đáp án) hoặc **Hướng dẫn chấm giáo viên**.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core:** React 19 + TypeScript + Vite
- **Styling & UI:** Tailwind CSS v3, Lucide React icons, CSS 3D Transforms, Responsive Design
- **State Management:** Zustand (quản lý trạng thái bài giảng, lịch sử chỉnh sửa, lưu trữ cục bộ `localStorage`)
- **AI Integration (BYOK):** Client-side Bring-Your-Own-Key cho **Google Gemini API** (`gemini-2.5-flash`, `gemini-1.5-pro`, `gemini-2.0-flash`) và các endpoint tương thích OpenAI (Groq, OpenRouter, OpenAI, Ollama). Lưu trữ key an toàn cục bộ tại trình duyệt người dùng.
- **Thư viện xuất bản (Export Tools):**
  - `pptxgenjs`: Tạo và tải trực tiếp tệp Microsoft PowerPoint (.PPTX) chuẩn 16:9 với slide notes
  - `canvas-confetti`: Hiệu ứng chúc mừng khi hoàn thành bài test điểm cao
  - Bộ tiện ích xuất định dạng: Quizizz CSV, Google Forms CSV, Anki TSV, Subtitles SRT, Marp Markdown, JSON backup/restore.
- **Bài Giảng Mẫu (Sample Presets):** Tích hợp sẵn 3 bộ bài giảng hoàn chỉnh (Sinh học 10, Deep Learning AI, Pomodoro & Deep Work) để trải nghiệm ngay lập tức mà không bắt buộc có API key.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu Cầu Hệ Thống
- Node.js >= 18
- Trình duyệt hiện đại (Chrome, Edge, Firefox, Safari)

### Chạy Development Server
```bash
# Cài đặt thư viện phụ thuộc (nếu chưa cài)
npm install

# Khởi chạy dev server
npm run dev
```
Truy cập: `http://localhost:5173`

### Build Bản Production
```bash
npm run build
npm run preview
```
