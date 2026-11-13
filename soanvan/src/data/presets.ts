import { LevelOption, PresetTopic, SubjectType, ToneKey } from '../types';

export const SUBJECT_CONFIG: Record<SubjectType, {
  levels: LevelOption[];
  defaultCode: string;
  presets: PresetTopic[];
}> = {
  eng: {
    levels: [
      { value: 'A1', label: 'A1 - Căn bản (Elementary / Lớp 3-5)' },
      { value: 'A2', label: 'A2 - Sơ trung cấp (Pre-Intermediate)' },
      { value: 'B1', label: 'B1 - Trung cấp (Intermediate)' },
      { value: 'B2', label: 'B2 - Trung cao cấp (Upper-Intermediate)' }
    ],
    defaultCode: 'HS26-05-A',
    presets: [
      { label: '💼 Từ vựng Kinh Doanh (A2)', topic: 'Từ vựng về Kinh Doanh (Business Vocabulary)', level: 'A2' },
      { label: '🏫 Trường học & Môn học (A1)', topic: 'Trường học & Học tập (School & Study)', level: 'A1' },
      { label: '🍔 Ẩm thực & Nhà hàng (A2)', topic: 'Ẩm thực & Đặt món (Food & Ordering)', level: 'A2' },
      { label: '🌍 Môi trường & Đời sống (B1)', topic: 'Bảo vệ Môi trường (Environment)', level: 'B1' },
      { label: '🚀 Công nghệ & Công việc (B2)', topic: 'Công nghệ & Tương lai (Technology & Work)', level: 'B2' }
    ]
  },
  van: {
    levels: [
      { value: 'VAO_10', label: 'Ôn thi vào lớp 10 (Lớp 9 - Form Sở GD / Hải Phòng)' },
      { value: 'THPT', label: 'Ôn thi Tốt nghiệp THPT (Lớp 12 - Form Bộ GD)' }
    ],
    defaultCode: 'HS26-09-V',
    presets: [
      { label: '📖 Đọc hiểu Thơ & Biện pháp tu từ (Lớp 9)', topic: 'Đọc hiểu Thơ hiện đại & Biện pháp tu từ', level: 'VAO_10' },
      { label: '🔥 NLXH: Ý chí vượt khó & Bản lĩnh (Lớp 9)', topic: 'Nghị luận xã hội: Ý chí và nghị lực vượt khó', level: 'VAO_10' },
      { label: '✍️ NLXH: Bản sắc cá nhân thời số hóa (Lớp 12)', topic: 'Nghị luận xã hội: Giữ gìn bản sắc cá nhân trong kỷ nguyên số', level: 'THPT' },
      { label: '🌸 NLVH: Phân tích nhân vật truyện ngắn (Lớp 12)', topic: 'Nghị luận văn học: Phân tích vẻ đẹp nhân vật trong tác phẩm truyện', level: 'THPT' }
    ]
  }
};

export function getToneInstruction(toneKey: ToneKey) {
  switch (toneKey) {
    case 'chi_em_35':
      return {
        label: 'Lớp 3–5: "Chị - em" (Nhẹ nhàng, sát SGK)',
        opening: 'Bây giờ chị sẽ đưa cho em VD về bài học hôm nay nhé. Phần nào chưa rõ em bảo chị giảng lại ngay nha!'
      };
    case 'toi_anhchi':
      return {
        label: 'Lớp 9–12 (Nghiêm khắc): "Tôi - Anh/chị"',
        opening: 'Tôi đề nghị anh chị nghiêm túc học! Tôi đã nhắc nguyên tắc làm bài này bao nhiêu lần rồi, hôm nay phải hoàn thành đầy đủ 10 câu dịch chéo và 10 bài tập dưới đây.'
      };
    case 'phu_huynh':
      return {
        label: 'Gửi Phụ huynh: "Chị - em / Cô - cháu"',
        opening: 'Dạ em/cháu gửi chị/cô nội dung bài học 45 phút hôm nay và phiếu bài tập của bé ạ.'
      };
    case 'chi_em_912':
    default:
      return {
        label: 'Lớp 9–12: "Chị - em" (Vui vẻ, thân thiện)',
        opening: 'Chị sẽ gửi tài liệu phần này để mình cày đề nhé. Không hiểu chỗ nào em hãy hỏi lại chị ngay nha!'
      };
  }
}

export function sanitizePrivacy(input: string): string {
  return input.replace(/(0|\+84)[0-9]{8,10}/g, '[ĐÃ ẨN SĐT]');
}
