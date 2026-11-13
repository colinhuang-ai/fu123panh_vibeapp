import { LessonProject } from "../types/lesson";

export const SAMPLE_PRESETS: LessonProject[] = [
  {
    id: "preset-dia-ly-tay-nam-bac-au",
    metadata: {
      topic: "Tìm hiểu Địa lý, Cảnh quan và Khí hậu của Tây Âu, Nam Âu và Bắc Âu",
      gradeLevel: "Lớp 7 - 11 (Địa Lý Tự Nhiên Các Châu Lục)",
      targetAudience: "Học sinh THCS, THPT và sinh viên chuyên ngành Sư phạm Địa lý",
      language: "Tiếng Việt",
      createdAt: "2026-11-08T09:00:00Z",
      tone: "Trực quan, phân tích nhân quả & Khoa học địa lý ứng dụng",
      duration: "45 phút",
      subject: "Địa Lý Châu Âu",
      region: "Tây Âu - Nam Âu - Bắc Âu",
    },
    slides: [
      {
        slideNumber: 1,
        title: "Hành Trình Khám Phá Ba Miền Địa Lý Châu Âu: Tây Âu, Nam Âu & Bắc Âu",
        bullets: [
          "Bố cục không gian: Bản đồ vệ tinh toàn cảnh châu Âu chia thành 3 mảng màu đặc trưng: Xanh lục (Tây Âu), Vàng cam (Nam Âu), Xanh tuyết (Bắc Âu).",
          "Mục tiêu bài học: Nhận diện quy luật phân hóa địa hình, các đới khí hậu và thảm thực vật đặc trưng của từng khu vực.",
          "Mối liên hệ nhân - quả: Dòng hải lưu Bắc Đại Tây Dương, gió Tây Ôn đới và Băng hà cổ đại tác động thế nào đến tự nhiên?",
          "Ý nghĩa thực tiễn: Khám phá cách con người ba miền thích ứng và phát triển kinh tế dựa trên lợi thế địa lý."
        ],
        visualPrompt: "Bản đồ vệ tinh 3D toàn cảnh châu Âu với hiệu ứng đồ họa chia 3 mảng màu: Xanh lục tươi sáng cho Tây Âu, Vàng rực rỡ nắng ấm cho Nam Âu, và Xanh băng tuyết huyền bí cho Bắc Âu.",
        speakerNotes: "Chào các em! Châu Âu tuy diện tích không lớn nhưng lại sở hữu những mảng đối lập tự nhiên kinh ngạc. Hôm nay chúng ta sẽ bắt đầu chuyến du hành từ biển sương mù Tây Âu xuống bờ cát Nam Âu và chạm vào băng tuyết Bắc Âu."
      },
      {
        slideNumber: 2,
        title: "Tây Âu – Vùng Đất Của Đồng Bằng Phì Nhiêu Và Khí Hậu Ôn Đới Hải Dương",
        bullets: [
          "Địa hình: Đồng bằng Bắc Âu mở rộng về phía tây, hệ thống sông ngòi dày đặc và giàu phù sa (sông Rhine, Seine, Thames).",
          "Khí hậu Ôn đới hải dương: Mưa nhiều quanh năm, mùa đông ấm áp, mùa hè mát mẻ nhờ tác động của dòng hải lưu Bắc Đại Tây Dương (Gulf Stream Drift) và gió Tây ôn đới.",
          "Cảnh quan: Rừng cây lá rộng rụng lá theo mùa (sồi, dẻ gai) xen lẫn các đồng cỏ xanh tốt phục vụ chăn nuôi thâm canh.",
          "Tác động kinh tế: Nền nông nghiệp năng suất cao hàng đầu thế giới và cụm đại đô thị cảng biển phát triển thịnh vượng."
        ],
        visualPrompt: "Cảnh thung lũng sông Rhine hoặc thảm cỏ xanh mướt ngút ngàn của Hà Lan, rừng sồi lá rộng rụng lá mùa thu bên bờ sông mờ sương ôn đới hải dương.",
        speakerNotes: "Hãy nhấn mạnh vào vai trò của dòng biển nóng Bắc Đại Tây Dương. Dù nằm ở vĩ độ cao tương đương Canada, mùa đông Tây Âu hiếm khi đóng băng nhờ chiếc máy sưởi tự nhiên này."
      },
      {
        slideNumber: 3,
        title: "Nam Âu – Bờ Biển Địa Trung Hải Rực Nắng Và Núi Đá Vôi",
        bullets: [
          "Địa hình: Ba bán đảo lớn nhô ra biển (Iberia, Ý, Balkan); địa hình núi trẻ chiếm ưu thế cùng các dạng địa hình Karst đá vôi độc đáo.",
          "Khí hậu Địa Trung Hải: Mùa hè khô hạn, nắng chói chang do áp cao cận nhiệt đới; mùa đông ấm áp và ẩm ướt đón mưa từ gió tây.",
          "Cảnh quan: Rừng cây lá cứng và cây bụi gai chịu hạn (Maquis), các đồn điền ô liu, thông ven biển và rừng sồi thường xanh.",
          "Tác động kinh tế: Trung tâm du lịch biển và di sản văn hóa thế giới; xứ sở của nông nghiệp cận nhiệt đới (nho, rượu vang, cam chanh)."
        ],
        visualPrompt: "Bờ biển Amalfi (Ý) với vách núi đá vôi dựng đứng bên bờ biển xanh ngọc bích, những rặng ô liu cổ thụ và chùm nho tím mọng dưới ánh nắng vàng Địa Trung Hải.",
        speakerNotes: "Lưu ý cho học sinh về nghịch lý khí hậu Địa Trung Hải: Nơi đây mưa nhiều vào mùa đông và khô khốc vào mùa hè, trái ngược hoàn toàn với khí hậu gió mùa nhiệt đới ở Việt Nam."
      },
      {
        slideNumber: 4,
        title: "Bắc Âu – Xứ Sở Của Băng Hà Cổ, Fjord Và Lãnh Nguyên Lạnh Giá",
        bullets: [
          "Địa hình Băng hà cổ đại: Bán đảo Scandinavia bị xẻ mạnh bởi các vịnh hẹp băng hà (Fjord) dựng đứng và hàng chục nghìn hồ băng hà ở Phần Lan.",
          "Khí hậu Cận cực & Ôn đới lục địa lạnh: Mùa đông kéo dài khắc nghiệt, tuyết phủ trắng xóa; mùa hè ngắn và mát mẻ.",
          "Cảnh quan: Rừng lá kim Taiga bạt ngàn (thông, vân sam) chuyển tiếp về phía bắc thành đài nguyên/lãnh nguyên (Tundra) rêu và địa y.",
          "Tác động kinh tế: Thế mạnh kinh tế biển, khai thác và chế biến lâm sản xuất khẩu, dẫn đầu thế giới về điện gió và năng lượng địa nhiệt."
        ],
        visualPrompt: "Vịnh hẹp Geirangerfjord Na Uy với vách núi đá dựng đứng phản chiếu mặt nước xanh biếc, rừng lá kim Taiga phủ tuyết trắng và dải cực quang lung linh trên bầu trời đêm.",
        speakerNotes: "Khái niệm 'Fjord' là điểm nhấn trọng tâm của bài thi. Hãy hướng dẫn học sinh hình dung sông băng như chiếc xẻng khổng lồ gọt sâu lòng thung lũng, tạo nên cảnh quan kỳ vĩ hôm nay."
      },
      {
        slideNumber: 5,
        title: "So Sánh Tổng Hợp & Tương Tác Giữa Con Người Với Tự Nhiên",
        bullets: [
          "Tây Âu: Tận dụng đồng bằng màu mỡ và mạng lưới sông đào phát triển nông nghiệp chính xác và công nghiệp chế biến hiện đại.",
          "Nam Âu: Tận dụng số giờ nắng kỷ lục và cảnh quan duyên hải độc đáo phát triển du lịch nghỉ dưỡng và năng lượng điện mặt trời.",
          "Bắc Âu: Phát huy lợi thế dòng chảy dốc sông băng và địa nhiệt để dẫn đầu quá trình chuyển dịch năng lượng xanh toàn cầu.",
          "Kết luận: Tự nhiên định hình bản sắc văn hóa và cấu trúc kinh tế của từng phân vùng châu Âu."
        ],
        visualPrompt: "Bảng infographic so sánh 3 cột trực quan: Cối xay gió và nông trại thông minh Tây Âu, Vườn nho và điện mặt trời Nam Âu, và Thủy điện sông băng Fjord Bắc Âu.",
        speakerNotes: "Tổng kết bài học: Không có vùng đất nào nghèo nàn nếu con người biết cách dựa vào quy luật tự nhiên để tạo ra mô hình kinh tế xanh thích ứng."
      }
    ],
    videoScript: [
      {
        timestamp: "00:00 - 00:15",
        visualCue: "Zoom nhanh vào bản đồ châu Âu 3D, chia highlight 3 màu: Xanh lục (Tây), Vàng cam (Nam), Xanh băng tuyết (Bắc).",
        voiceover: "Châu Âu tuy không phải là một lục địa khổng lồ, nhưng lại sở hữu những mảng đối lập tự nhiên kinh ngạc. Đi từ biển sương mù Tây Âu xuống bờ cát Nam Âu và chạm vào băng tuyết Bắc Âu, bạn sẽ thấy thiên nhiên thay đổi thế nào?",
        durationSeconds: 15
      },
      {
        timestamp: "00:15 - 00:40",
        visualCue: "Cảnh thung lũng sông Rhine mờ sương, những thảm cỏ xanh mướt và mưa phùn nhẹ trên các cánh đồng Tây Âu.",
        voiceover: "Đầu tiên là Tây Âu. Chịu ảnh hưởng trực tiếp từ dòng hải lưu nóng Gulf Stream, nơi đây mang khí hậu ôn đới hải dương: ẩm ướt, mưa quanh năm, mùa đông không quá lạnh. Địa hình chủ yếu là đồng bằng phẳng lặng, màu mỡ, nơi các đại đô thị phát triển rực rỡ.",
        durationSeconds: 25
      },
      {
        timestamp: "00:40 - 01:05",
        visualCue: "Bờ biển Amalfi (Ý) rực nắng, những rặng cây ô liu và vách đá vôi dựng đứng bên bờ biển xanh ngọc.",
        voiceover: "Xuôi về phía Nam, bức tranh đảo chiều hoàn toàn. Nam Âu đón khí hậu Địa Trung Hải trứ danh: hè khô hạn, nắng chói chang, đông mưa ấm. Địa hình hiểm trở với nhiều dãy núi trẻ và những bờ biển đá vôi ngoạn mục tạo nên xứ sở du lịch số một thế giới.",
        durationSeconds: 25
      },
      {
        timestamp: "01:05 - 01:35",
        visualCue: "Vịnh hẹp Geirangerfjord ở Na Uy, rừng thông phủ tuyết trắng và cực quang lung linh trên bầu trời Bắc Cực.",
        voiceover: "Cuối cùng, hướng về phương Bắc lạnh giá. Bán đảo Scandinavia và vùng Baltic được tạc nên bởi các đợt băng hà cổ đại, tạo ra những vịnh Fjord hun hút. Rừng Taiga lá kim bạt ngàn nhường chỗ cho lãnh nguyên băng giá khi tiến sát vòng Cực.",
        durationSeconds: 30
      },
      {
        timestamp: "01:35 - 01:45",
        visualCue: "Bảng tóm tắt nhanh 3 từ khóa: Ôn hòa (Tây) - Nắng ấm (Nam) - Băng hà (Bắc). Text hiện CTA kiểm tra kiến thức.",
        voiceover: "Ba vùng đất, ba vẻ đẹp tự nhiên định hình nên đời sống và lịch sử lục địa già. Thử kiểm tra trí nhớ của bạn ở phần bài tập trắc nghiệm và flashcard bên dưới nhé!",
        durationSeconds: 15
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Dòng hải lưu nào đóng vai trò then chốt giúp Tây Âu có khí hậu ấm hơn đáng kể so với các vùng cùng vĩ độ ở Bắc Mỹ hay châu Á?",
        options: [
          "Dòng hải lưu Lạnh Labrador",
          "Dòng hải lưu Bắc Đại Tây Dương (North Atlantic Drift)",
          "Dòng hải lưu Humboldt",
          "Dòng hải lưu Oya-shio"
        ],
        correctIndex: 1,
        explanation: "Dòng hải lưu nóng Bắc Đại Tây Dương (phần nối dài của Gulf Stream) mang luồng nước ấm và khối khí ẩm từ vùng nhiệt đới lên phía bắc, sưởi ấm bờ biển Tây Bắc châu Âu, giúp các cảng biển không bị đóng băng vào mùa đông."
      },
      {
        id: 2,
        question: "Đặc điểm nào sau đây phản ánh chính xác nhất chế độ nhiệt ẩm của khí hậu Địa Trung Hải ở Nam Âu?",
        options: [
          "Mưa nhiều vào mùa hè, mùa đông khô lạnh",
          "Mưa đều quanh năm, biên độ nhiệt ngày đêm rất nhỏ",
          "Mùa hè khô nóng, mùa đông ấm áp và ẩm ướt có mưa",
          "Khô hạn quanh năm, nhiệt độ thường xuyên dưới 0 độ C"
        ],
        correctIndex: 2,
        explanation: "Vào mùa hè, Nam Âu chịu ảnh hưởng của khối khí chí tuyến khô nóng thuộc đới áp cao cận nhiệt đới; vào mùa đông, vùng này đón các luồng gió tây từ Đại Tây Dương và Địa Trung Hải mang mưa đến."
      },
      {
        id: 3,
        question: "'Fjord' (vịnh hẹp ven biển có vách đá dốc đứng) phổ biến nhất tại khu vực nào của Châu Âu?",
        options: [
          "Duyên hải Tây Ban Nha và Bồ Đào Nha",
          "Bờ biển phía tây Na Uy (Bắc Âu)",
          "Đồng bằng duyên hải Hà Lan và Bỉ",
          "Quần đảo Hy Lạp"
        ],
        correctIndex: 1,
        explanation: "Fjord là sản phẩm xói mòn sâu của các sông băng (băng hà cổ đại) lấn ra biển rồi tan đi, tạo thành những vịnh biển ăn sâu vào đất liền với hai bên vách đá dựng đứng, đặc trưng nhất ở bờ biển Na Uy."
      }
    ],
    flashcards: [
      {
        id: 1,
        front: "Fjord (Vịnh hẹp băng hà) là gì?",
        back: "Dạng địa hình thung lũng dốc sâu được tạo thành do sông băng xói mòn ngập nước biển, phổ biến nhất ở Na Uy (Bắc Âu).",
        mnemonicCue: "Tưởng tượng 'lưỡi dao băng khổng lồ rạch nát sườn núi'."
      },
      {
        id: 2,
        front: "Maquis (Rừng cây bụi gai) là gì?",
        back: "Hệ sinh thái thực vật đặc trưng của Nam Âu: lá nhỏ, phủ sáp, chịu hạn tốt trong mùa hè khô hạn Địa Trung Hải.",
        mnemonicCue: "Cây lá sáp giữ nước sống qua mùa hè khô bỏng rát Nam Âu."
      },
      {
        id: 3,
        front: "Gulf Stream & North Atlantic Drift có vai trò gì?",
        back: "Hệ thống dòng biển nóng sưởi ấm bờ biển Tây và Bắc Âu, ngăn các bến cảng đóng băng trong suốt mùa đông.",
        mnemonicCue: "'Chiếc máy sưởi trung tâm' chạy bằng nước nóng của châu Âu."
      },
      {
        id: 4,
        front: "Rừng Taiga là gì?",
        back: "Rừng lá kim đồng nhất (thông, tùng, vân sam) bao phủ phần lớn diện tích Bán đảo Scandinavia và Bắc Âu.",
        mnemonicCue: "Rừng cây hình nón nhọn hứng tuyết mùa đông Bắc Âu."
      }
    ],
    exercises: [
      {
        id: 1,
        title: "Phân Tích Dữ Liệu: Nhận Diện Ba Trạm Quan Trắc Khí Hậu Châu Âu (Data Analysis)",
        type: "analysis",
        prompt: "Học sinh được cung cấp số liệu nhiệt độ và lượng mưa 12 tháng của 3 trạm quan trắc ẩn danh: Paris (Pháp), Athens (Hy Lạp), và Tromsø (Na Uy).\nNhiệm vụ: Hãy xác định trạm nào thuộc Tây Âu, Nam Âu, hoặc Bắc Âu dựa trên tính toán: biên độ nhiệt năm (Tmax - Tmin) và tỷ lệ lượng mưa mùa hè so với mùa đông. Giải thích cơ sở địa lý cho từng lựa chọn.",
        rubric: [
          { criteria: "Xác định chính xác trạm Paris thuộc Tây Âu (mưa phân bố tương đối đồng đều các tháng, mùa đông ấm trên 0°C)", points: 30 },
          { criteria: "Xác định chính xác trạm Athens thuộc Nam Âu (mùa hè nắng gắt lượng mưa rất thấp < 20mm/tháng, mưa dồn vào mùa đông)", points: 35 },
          { criteria: "Xác định chính xác trạm Tromsø thuộc Bắc Âu (nhiệt độ mùa đông âm sâu dưới -5°C, biên độ nhiệt lớn, lượng mưa tuyết)", points: 35 }
        ],
        sampleAnswer: "1. Trạm Tây Âu (Paris): Lượng mưa dao động đều từ 50-70mm/tháng quanh năm, không có tháng nào khô hạn. Nhiệt độ tháng 1 trung bình ~5°C, tháng 7 ~20°C (biên độ nhiệt nhỏ ~15°C) -> Đặc trưng ôn đới hải dương chịu ảnh hưởng gió Tây ôn đới.\n2. Trạm Nam Âu (Athens): Tháng 6-8 lượng mưa < 15mm, nhiệt độ cao > 28°C; tháng 11-1 lượng mưa vọt lên > 80mm -> Đặc trưng Địa Trung Hải khô hè ẩm đông.\n3. Trạm Bắc Âu (Tromsø): Tháng 12-2 nhiệt độ trung bình -4°C đến -6°C, tuyết phủ dày; mùa hè mát mẻ ~12°C -> Khí hậu cận cực và ôn đới lạnh Scandinavia."
      },
      {
        id: 2,
        title: "Nghiên Cứu Tình Huống: Chiến Lược Chuyển Dịch Năng Lượng Tái Tạo Tại Liên Minh Châu Âu (Case Study)",
        type: "case_study",
        prompt: "Giả sử bạn là chuyên gia tư vấn năng lượng tái tạo cho Liên minh Châu Âu (EU). Hãy đề xuất 1 loại hình năng lượng tự nhiên phù hợp nhất để phát triển vượt trội tại mỗi khu vực (Tây Âu, Nam Âu, Bắc Âu) và giải thích mối quan hệ giữa lựa chọn đó với điều kiện địa hình, khí quyển hoặc dòng chảy của vùng.",
        rubric: [
          { criteria: "Tây Âu: Ưu tiên Điện gió ngoài khơi (Offshore Wind) nhờ gió Tây Ôn đới thổi mạnh liên tục trên vùng thềm lục địa nông biển Bắc", points: 35 },
          { criteria: "Nam Âu: Ưu tiên Điện mặt trời (Solar Power) nhờ số giờ nắng cao vượt trội (> 2.800 giờ/năm) và khí hậu mùa hè ít mây", points: 35 },
          { criteria: "Bắc Âu: Ưu tiên Thủy điện (Hydroelectric) và Địa nhiệt (vùng Iceland) nhờ địa hình dốc, dòng chảy sông băng dồi dào", points: 30 }
        ],
        sampleAnswer: "Bản Tư Vấn Chiến Lược Năng Lượng Xanh EU:\n1. Phân vùng Tây Âu: Ưu tiên phát triển các trang trại Điện gió ngoài khơi (Biển Bắc, eo biển Manche). Cơ sở: Gió Tây ôn đới thổi liên tục quanh năm không đổi hướng kết hợp với thềm lục địa nông sâu dưới 50m, thuận lợi đặt tua-bin công suất lớn.\n2. Phân vùng Nam Âu (Bán đảo Iberia, Ý, Hy Lạp): Đầu tư trọng điểm vào Điện mặt trời (Quang điện & Điện nhiệt mặt trời CSP). Cơ sở: Nằm sát vĩ độ chí tuyến, góc chiếu mặt trời lớn, bầu trời quang đãng với hơn 3.000 giờ nắng/năm.\n3. Phân vùng Bắc Âu (Na Uy, Thụy Điển, Iceland): Tối đa hóa Thủy điện tích năng và Năng lượng Địa nhiệt. Cơ sở: Các thung lũng băng hà dốc đứng tạo cột nước cao và lưu lượng nước tan băng dồi dào, Na Uy hiện tự chủ hơn 90% điện năng từ thủy điện sạch."
      }
    ]
  },
  {
    id: "preset-dia-ly-alps-bien-doi-khi-hau",
    metadata: {
      topic: "Hệ Núi Trẻ Alps & Thách Thức Biến Đổi Khí Hậu Châu Âu",
      gradeLevel: "Lớp 8 - 12 (Địa Lý Tự Nhiên & Môi Trường)",
      targetAudience: "Học sinh THPT và giáo viên bộ môn Địa lý môi trường",
      language: "Tiếng Việt",
      createdAt: "2026-11-08T09:30:00Z",
      tone: "Khoa học, cảnh báo sinh thái & Phân tích giải pháp",
      duration: "45 phút",
      subject: "Địa Lý Châu Âu",
      region: "Dãy Alps (Trung và Nam Âu)",
    },
    slides: [
      {
        slideNumber: 1,
        title: "Dãy Alps: Mái Nhà Sinh Thái & Tháp Nước Của Châu Âu",
        bullets: [
          "Dãy núi trẻ hình thành từ kỳ vận động uốn nếp Alps (Kainozoi) do mảng châu Phi va chạm mảng Á - Âu.",
          "Trải dài qua 8 quốc gia với đỉnh Mont Blanc cao 4.809m.",
          "Được mệnh danh là 'Tháp nước châu Âu', cung cấp nguồn nước ngọt nuôi sống các lưu vực sông Rhine, Rhone, Po và Danube."
        ],
        visualPrompt: "Hình ảnh panorama hùng vĩ của dãy núi Alps phủ tuyết trắng xóa quanh năm, dòng sông băng uốn lượn giữa các đỉnh núi nhọn sắc sảo.",
        speakerNotes: "Alps không chỉ là cảnh quan du lịch mà là lá chắn khí hậu phân cách giữa khí hậu ôn đới ẩm phía bắc và Địa Trung Hải phía nam."
      },
      {
        slideNumber: 2,
        title: "Sự Phân Hóa Đai Cao Sinh Thái Trên Dãy Alps",
        bullets: [
          "Dưới 800m: Đai đồng bằng và chân núi trồng cây ăn quả, đồng cỏ xanh tốt.",
          "800m - 1.800m: Đai rừng hỗn giao lá rộng - lá kim chuyển sang rừng thông Taiga thuần loại.",
          "1.800m - 2.800m: Đai đồng cỏ núi cao (Alp pasture) thảm hoa rực rỡ vào mùa hè.",
          "Trên 2.800m: Vành đai băng tuyết vĩnh cửu và đá trần khắc nghiệt."
        ],
        visualPrompt: "Sơ đồ cắt ngang lát cắt thẳng đứng mô tả các đai thực vật theo độ cao của dãy núi Alps từ chân núi đến đỉnh băng tuyết.",
        speakerNotes: "Nhấn mạnh quy luật đai cao: Cứ lên cao 100m, nhiệt độ giảm trung bình 0,6°C, tạo ra các tầng sinh học đa dạng trong cự ly ngắn."
      },
      {
        slideNumber: 3,
        title: "Tác Động Băng Tan & Suy Giảm Trữ Lượng Nước Ngọt",
        bullets: [
          "Tốc độ ấm lên tại dãy Alps nhanh gấp 2 lần mức trung bình toàn cầu trong thế kỷ qua.",
          "Các dòng sông băng huyền thoại (như Aletsch) bị thu hẹp hơn 30% thể tích kể từ năm 1980.",
          "Nguy cơ cạn kiệt dòng chảy mùa hè trên các tuyến giao thông đường thủy Rhine và Danube.",
          "Hiểm họa sạt lở đá và lũ bùn đá (debris flow) đe dọa các ngôi làng thung lũng."
        ],
        visualPrompt: "Hình ảnh so sánh trước/sau (Then vs Now) của một dòng sông băng tại Thụy Sĩ: Năm 1930 băng dày đặc vs Năm 2026 băng thụt sâu để lộ sườn đá cằn cỗi.",
        speakerNotes: "Cảnh báo bài học: Biến đổi khí hậu không còn là lý thuyết xa vời mà đang làm cạn kiệt chiếc tháp nước của 200 triệu người dân châu Âu."
      }
    ],
    videoScript: [
      {
        timestamp: "00:00 - 00:30",
        visualCue: "Flycam bay lướt trên đỉnh Mont Blanc và các dòng sông băng Alps trắng muốt phản chiếu ánh mặt trời rực rỡ.",
        voiceover: "Dãy Alps là biểu tượng thiên nhiên kỳ vĩ nhất lục địa già, cung cấp hơn 90% nước ngọt cho vùng hạ lưu Tây và Trung Âu. Nhưng điều gì sẽ xảy ra nếu chiếc tháp nước này cạn khô?",
        durationSeconds: 30
      },
      {
        timestamp: "00:30 - 01:15",
        visualCue: "Sơ đồ chuyển động của mảng kiến tạo châu Phi đội lên mảng Á-Âu tạo nên các rặng núi uốn nếp sắc nhọn.",
        voiceover: "Hình thành từ hàng chục triệu năm trước trong cuộc va chạm lục địa ngoạn mục, dãy Alps ngăn cách hai thế giới: Một bên là ôn đới ẩm ướt, một bên là nắng ấm Địa Trung Hải. Độ cao tạc nên những thảm thực vật kỳ thú từ rừng sồi chân núi đến đồng cỏ nở hoa trên mây.",
        durationSeconds: 45
      },
      {
        timestamp: "01:15 - 01:45",
        visualCue: "Cận cảnh sông băng Aletsch nhỏ giọt tan chảy nhanh chóng, tạo thành các dòng suối đục ngầu cuồn cuộn.",
        voiceover: "Tuy nhiên, biến đổi khí hậu đang làm đảo lộn quy luật ấy. Băng tuyết vĩnh cửu đang lùi bước với tốc độ báo động, đe dọa trực tiếp an ninh nguồn nước và ngành du lịch trượt tuyết châu Âu. Hãy kiểm tra kiến thức của bạn ở phần sau!",
        durationSeconds: 30
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Dãy núi Alps được hình thành do sự va chạm giữa hai mảng kiến tạo nào?",
        options: [
          "Mảng Á - Âu và Mảng châu Phi",
          "Mảng Bắc Mỹ và Mảng Thái Bình Dương",
          "Mảng Nam Mỹ và Mảng Nazca",
          "Mảng Ấn Độ và Mảng Á - Âu"
        ],
        correctIndex: 0,
        explanation: "Dãy núi trẻ Alps là kết quả trực tiếp của kỳ vận động uốn nếp Kainozoi khi mảng lục địa châu Phi dịch chuyển về phía bắc va chạm dữ dội với mảng Á - Âu."
      },
      {
        id: 2,
        question: "Quy luật tự nhiên nổi bật nhất chi phối sự phân bố thảm thực vật trên dãy Alps là gì?",
        options: [
          "Quy luật phi địa đới: Đai cao",
          "Quy luật địa đới: Vĩ độ",
          "Quy luật hải dương - lục địa",
          "Quy luật triều cường"
        ],
        correctIndex: 0,
        explanation: "Khi lên cao, nhiệt độ giảm và lượng mưa thay đổi mạnh, tạo nên sự thay đổi tầng thực vật theo chiều thẳng đứng (quy luật đai cao)."
      }
    ],
    flashcards: [
      {
        id: 1,
        front: "Đỉnh núi cao nhất dãy Alps và châu Âu là gì?",
        back: "Đỉnh Mont Blanc (cao 4.809m) nằm giữa biên giới Pháp và Ý.",
        mnemonicCue: "'Mont Blanc' nghĩa là 'Núi Trắng' quanh năm phủ tuyết."
      },
      {
        id: 2,
        front: "Tại sao dãy Alps được gọi là 'Tháp nước châu Âu'?",
        back: "Là nơi khởi nguồn của 4 hệ thống sông lớn nhất châu Âu: Rhine, Rhone, Po và các nhánh của Danube.",
        mnemonicCue: "Băng tuyết Alps tích nước mùa đông và xả nước ngọt đều đặn mùa hè cho toàn lục địa."
      }
    ],
    exercises: [
      {
        id: 1,
        title: "Dự Án Nghiên Cứu: Thích Ứng Của Ngành Du Lịch Trượt Tuyết Mùa Đông Tại Thụy Sĩ",
        type: "project",
        prompt: "Nhiều khu nghỉ dưỡng trượt tuyết tại độ cao dưới 1.500m ở dãy Alps đang đối mặt với tình trạng thiếu tuyết tự nhiên vào mùa đông. Em hãy đề xuất một kế hoạch chuyển đổi mô hình kinh tế 'Du lịch 4 mùa bền vững' (Alpine 4-season tourism) cho một thị trấn vùng núi Thụy Sĩ nhằm giảm phụ thuộc vào tuyết mùa đông.",
        rubric: [
          { criteria: "Đánh giá chính xác thực trạng suy giảm ngày có tuyết rơi do biến đổi khí hậu", points: 30 },
          { criteria: "Đề xuất các sản phẩm du lịch mùa hè / thu hấp dẫn (leo núi, xe đạp địa hình, tắm khoáng, lễ hội đồng cỏ)", points: 40 },
          { criteria: "Tính khả thi và giải pháp bảo vệ sinh thái địa phương", points: 30 }
        ],
        sampleAnswer: "Kế hoạch Du Lịch 4 Mùa:\n1. Mùa hè - thu: Xây dựng tuyến đường mòn xe đạp leo núi (E-MTB Trail), tour ngắm hoa dã quỳ núi cao, thiền định giữa rừng thông và du lịch nông trại chăn thả bò sữa truyền thống.\n2. Mùa đông: Giảm diện tích súng phun tuyết nhân tạo (vì gây tốn năng lượng và nguồn nước), chuyển sang các trải nghiệm ẩm thực Fondue pho-mát trong lều tuyết ấm áp, đi bộ ngắm sao đêm và nghỉ dưỡng suối khoáng nóng Thermal Spa."
      }
    ]
  },
  {
    id: "preset-dia-ly-song-rhine-danube",
    metadata: {
      topic: "Mạng Lưới Sông Ngòi Châu Âu: Trục Huyết Mạch Kinh Tế Rhine & Danube",
      gradeLevel: "Lớp 8 - 11 (Địa Lý Kinh Tế - Xã Hội Châu Âu)",
      targetAudience: "Học sinh và giáo viên Địa lý kinh tế",
      language: "Tiếng Việt",
      createdAt: "2026-11-08T09:45:00Z",
      tone: "Phân tích địa - kinh tế & Giao thông thủy toàn cầu",
      duration: "45 phút",
      subject: "Địa Lý Châu Âu",
      region: "Tây - Trung - Đông Âu",
    },
    slides: [
      {
        slideNumber: 1,
        title: "Sông Rhine & Danube: Hai Trục Xương Sống Của Lục Địa Già",
        bullets: [
          "Châu Âu sở hữu mạng lưới sông ngòi tự nhiên kết hợp kênh đào nhân tạo dày đặc nhất hành tinh.",
          "Sông Rhine (1.230 km): Chảy từ dãy Alps qua các trung tâm công nghiệp Tây Âu đổ ra Biển Bắc tại siêu cảng Rotterdam.",
          "Sông Danube (2.850 km): Dòng sông quốc tế nhất thế giới chảy qua 10 quốc gia trước khi đổ vào Biển Đen."
        ],
        visualPrompt: "Bản đồ vệ tinh sông ngòi châu Âu nổi bật hai dòng sông Rhine (chảy hướng Bắc) và Danube (chảy hướng Đông Nam) cùng kênh đào liên kết Rhine-Main-Danube.",
        speakerNotes: "Nếu ví châu Âu như một cơ thể sống, thì Rhine và Danube chính là hai động mạch chủ nuôi dưỡng toàn bộ nền công nghiệp nặng và mậu dịch quốc tế."
      },
      {
        slideNumber: 2,
        title: "Kênh Đào Rhine - Main - Danube: Kỳ Tích Nối Liền Hai Biển",
        bullets: [
          "Khánh thành năm 1992, liên kết trực tiếp Biển Bắc (Đại Tây Dương) với Biển Đen (phía đông nam).",
          "Tạo ra tuyến hành lang giao thông thủy xuyên lục địa dài 3.500 km từ Rotterdam đến Sulina (Romania).",
          "Giảm thiểu 80% phát thải CO₂ so với vận tải đường bộ bằng xe tải container."
        ],
        visualPrompt: "Hình ảnh âu tàu (lock) khổng lồ trên kênh đào Rhine-Main-Danube đang nâng một sà lan container vượt qua đỉnh phân thủy châu Âu.",
        speakerNotes: "Âu tàu vượt núi trên kênh đào này là đỉnh cao kỹ thuật thủy lợi của người Đức, nâng tàu thuyền vượt qua độ cao hơn 400m so với mực nước biển."
      }
    ],
    videoScript: [
      {
        timestamp: "00:00 - 00:30",
        visualCue: "Sà lan chở hàng trăm container lướt êm ả trên dòng sông Rhine giữa hai bên bờ là lâu đài cổ và vườn nho bạt ngàn.",
        voiceover: "Không cần những con tàu viễn dương khổng lồ, sức mạnh kinh tế của Tây Âu được vận chuyển âm thầm ngày đêm trên những sà lan sông ngòi. Chào mừng các bạn đến với mạng lưới đường thủy Rhine và Danube.",
        durationSeconds: 30
      },
      {
        timestamp: "00:30 - 01:15",
        visualCue: "Đồ họa tuyến đường từ Biển Bắc đi qua sông Rhine, vượt kênh đào nối vào sông Danube ra Biển Đen.",
        voiceover: "Năm 1992, người châu Âu hoàn thành giấc mơ từ thời hoàng đế Charlemagne: Đào kênh kết nối sông Rhine và sông Danube. Giờ đây, hàng hóa từ bờ biển Hà Lan có thể đi thẳng một mạch sang Đông Âu và Biển Đen mà không cần đi vòng qua eo biển Gibraltar.",
        durationSeconds: 45
      }
    ],
    quiz: [
      {
        id: 1,
        question: "Sông Danube chảy qua bao nhiêu quốc gia trước khi đổ vào Biển Đen?",
        options: ["10 quốc gia", "4 quốc gia", "7 quốc gia", "15 quốc gia"],
        correctIndex: 0,
        explanation: "Sông Danube giữ kỷ lục thế giới về số quốc gia đi qua (10 nước): Đức, Áo, Slovakia, Hungary, Croatia, Serbia, Bulgaria, Romania, Moldova và Ukraine."
      }
    ],
    flashcards: [
      {
        id: 1,
        front: "Sông ngòi châu Âu có đặc điểm thủy chế nào nổi bật?",
        back: "Lưu lượng nước điều hòa quanh năm (đặc biệt ở Tây Âu) nhờ mưa đều và nước tan từ băng tuyết dãy Alps, kết hợp với địa hình đồng bằng giúp tàu bè đi lại thuận lợi.",
        mnemonicCue: "Sông Tây Âu ít lũ quét, nước đầy quanh năm cho sà lan chở hàng."
      }
    ],
    exercises: [
      {
        id: 1,
        title: "Nghiên Cứu Tình Huống: Mực Nước Thấp Kỷ Lục Trên Sông Rhine & Gián Đoạn Chuỗi Cung Ứng",
        type: "case_study",
        prompt: "Mùa hè năm 2022 và 2023, do nắng nóng kéo dài, điểm đo mực nước Kaub trên sông Rhine hạ xuống dưới 40cm, khiến các sà lan chỉ chở được 25% trọng tải bình thường. Hãy phân tích tác động dây chuyền của hiện tượng này đến nền kinh tế công nghiệp Đức và đề xuất giải pháp kỹ thuật / hậu cần logistics thích ứng.",
        rubric: [
          { criteria: "Phân tích tác động trực tiếp đến việc vận chuyển than đá, hóa chất BASF và linh kiện cơ khí", points: 40 },
          { criteria: "Đề xuất giải pháp thiết kế tàu sà lan đáy nông thế hệ mới (shallow-water barges) và chuyển tải sang đường sắt", points: 40 },
          { criteria: "Đánh giá tính bền vững trong bối cảnh biến đổi khí hậu toàn cầu", points: 20 }
        ],
        sampleAnswer: "Tác động & Giải pháp:\n1. Tác động: Sông Rhine vận chuyển hơn 80% lượng hàng hóa đường thủy của Đức. Khi nước cạn, sà lan không thể chở nặng, đẩy chi phí vận tải thủy tăng vọt gấp 5 lần, đe dọa các nhà máy hóa chất và nhiệt điện phụ thuộc vào nguồn than nhập khẩu qua cảng Rotterdam.\n2. Giải pháp: Tập đoàn hóa chất BASF đã hợp tác đóng các sà lan đáy nông đặc biệt có thể hoạt động ở mực nước chỉ 30cm; đồng thời nâng cấp hệ thống bốc dỡ đường sắt dự phòng và nạo vét các điểm thắt luồng tàu trên lòng sông."
      }
    ]
  }
];
