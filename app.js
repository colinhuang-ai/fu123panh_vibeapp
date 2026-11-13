// ============================================================================
// MÁY SOẠN BÀI 45 PHÚT - BỘ NÃO DẠY HỌC (TIẾNG ANH & NGỮ VĂN)
// Tuân thủ 100% dac-ta-may-soan-bai.md & ho_so_lop_v1.md
// ============================================================================

let currentSubject = 'eng'; // 'eng' hoặc 'van'
let currentFlashcards = [];
let currentCardIndex = 0;
let isApproved = false;

// Cấu hình Trình độ & Chủ đề gợi ý theo môn
const SUBJECT_CONFIG = {
    eng: {
        levels: [
            { value: 'A1', label: 'A1 - Căn bản (Elementary / Lớp 3-5)' },
            { value: 'A2', label: 'A2 - Sơ trung cấp (Pre-Intermediate)' },
            { value: 'B1', label: 'B1 - Trung cấp (Intermediate)' },
            { value: 'B2', label: 'B2 - Trung cao cấp (Upper-Intermediate)' }
        ],
        defaultCode: 'HS26-05-A',
        presets: [
            { label: '💼 Từ vựng Kinh Doanh (A2)', topic: 'Từ vựng về Kinh Doanh (Business)', level: 'A2' },
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

// Kho từ vựng chuẩn phân tách cố định theo đúng từng Level (A1, A2, B1, B2) - Mỗi bộ 25 từ vựng (trong khoảng 20-30 từ)
const VOCAB_BY_LEVEL = {
    A1: {
        business: [
            { word: 'shop', pos: 'n', meaning: 'cửa hàng / tiệm', exEn: 'My family has a small fried chicken shop.', exVi: 'Gia đình tôi có một tiệm gà rán nhỏ.' },
            { word: 'money', pos: 'n', meaning: 'tiền', exEn: 'She counts the money every evening.', exVi: 'Cô ấy đếm tiền vào mỗi buổi tối.' },
            { word: 'buy', pos: 'v', meaning: 'mua', exEn: 'Many students buy French fries after school.', exVi: 'Nhiều học sinh mua khoai tây chiên sau giờ học.' },
            { word: 'sell', pos: 'v', meaning: 'bán', exEn: 'We sell hot food from 4 PM to 10:30 PM.', exVi: 'Chúng tôi bán đồ ăn nóng từ 4 giờ chiều đến 10 rưỡi tối.' },
            { word: 'pay', pos: 'v', meaning: 'trả tiền / thanh toán', exEn: 'You can pay by cash or QR code.', exVi: 'Bạn có thể thanh toán bằng tiền mặt hoặc mã QR.' },
            { word: 'cheap', pos: 'adj', meaning: 'rẻ / bình dân', exEn: 'This snack is delicious and cheap.', exVi: 'Món ăn vặt này ngon và rẻ.' },
            { word: 'open', pos: 'v/adj', meaning: 'mở cửa', exEn: 'The shop is open every day.', exVi: 'Cửa hàng mở cửa mỗi ngày.' },
            { word: 'close', pos: 'v', meaning: 'đóng cửa', exEn: 'We clean and close the shop at night.', exVi: 'Chúng tôi dọn dẹp và đóng cửa tiệm vào buổi tối.' },
            { word: 'work', pos: 'v/n', meaning: 'làm việc / công việc', exEn: 'The staff start work in the afternoon.', exVi: 'Nhân viên bắt đầu làm việc vào buổi chiều.' },
            { word: 'bag', pos: 'n', meaning: 'túi / bao gói', exEn: 'Put the food in a clean paper bag.', exVi: 'Hãy cho đồ ăn vào một chiếc túi giấy sạch sẽ.' },
            { word: 'box', pos: 'n', meaning: 'hộp đựng', exEn: 'Each meal comes with a small sauce box.', exVi: 'Mỗi phần ăn đi kèm một hộp sốt nhỏ.' },
            { word: 'help', pos: 'v/n', meaning: 'giúp đỡ / hỗ trợ', exEn: 'How can I help you today?', exVi: 'Hôm nay tôi có thể giúp gì cho bạn?' },
            { word: 'food', pos: 'n', meaning: 'đồ ăn / thực phẩm', exEn: 'Hot food is ready in five minutes.', exVi: 'Đồ ăn nóng sẵn sàng trong vòng năm phút.' },
            { word: 'drink', pos: 'n/v', meaning: 'đồ uống / uống', exEn: 'Would you like a cold drink?', exVi: 'Bạn có muốn dùng một phần đồ uống lạnh không?' },
            { word: 'chicken', pos: 'n', meaning: 'thịt gà', exEn: 'Fried chicken is our main dish.', exVi: 'Gà rán là món ăn chính của chúng tôi.' },
            { word: 'potato', pos: 'n', meaning: 'khoai tây', exEn: 'I peel fresh potatoes every morning.', exVi: 'Tôi gọt vỏ khoai tây tươi vào mỗi buổi sáng.' },
            { word: 'hot', pos: 'adj', meaning: 'nóng hổi', exEn: 'The fried rolls are still hot.', exVi: 'Những chiếc nem rán vẫn còn nóng hổi.' },
            { word: 'clean', pos: 'adj/v', meaning: 'sạch sẽ / dọn sạch', exEn: 'Our kitchen is always clean.', exVi: 'Gian bếp của chúng tôi luôn sạch sẽ.' },
            { word: 'fast', pos: 'adj/adv', meaning: 'nhanh chóng', exEn: 'We prepare your meal very fast.', exVi: 'Chúng tôi chuẩn bị bữa ăn của bạn rất nhanh.' },
            { word: 'good', pos: 'adj', meaning: 'tốt / ngon', exEn: 'The cheese powder tastes very good.', exVi: 'Bột phô mai có vị rất ngon.' },
            { word: 'new', pos: 'adj', meaning: 'mới', exEn: 'We have a new combo today.', exVi: 'Hôm nay chúng tôi có một phần ăn mới.' },
            { word: 'number', pos: 'n', meaning: 'con số / số thứ tự', exEn: 'Please check your order number.', exVi: 'Vui lòng kiểm tra số thứ tự đơn hàng của bạn.' },
            { word: 'time', pos: 'n', meaning: 'thời gian / giờ', exEn: 'Closing time is half past ten.', exVi: 'Giờ đóng cửa là mười giờ rưỡi tối.' },
            { word: 'day', pos: 'n', meaning: 'ngày', exEn: 'We buy fresh potatoes every two days.', exVi: 'Chúng tôi mua khoai tây tươi hai ngày một lần.' },
            { word: 'table', pos: 'n', meaning: 'cái bàn', exEn: 'Please sit at this clean table.', exVi: 'Xin mời ngồi ở chiếc bàn sạch sẽ này.' }
        ],
        school: [
            { word: 'book', pos: 'n', meaning: 'quyển sách', exEn: 'Open your English book to page ten.', exVi: 'Hãy mở sách tiếng Anh của em ra trang số 10.' },
            { word: 'pen', pos: 'n', meaning: 'cái bút mực', exEn: 'Write the answer with a blue pen.', exVi: 'Hãy viết câu trả lời bằng bút mực xanh.' },
            { word: 'desk', pos: 'n', meaning: 'bàn học', exEn: 'Keep your desk clean and tidy.', exVi: 'Hãy giữ bàn học của em sạch sẽ và gọn gàng.' },
            { word: 'teacher', pos: 'n', meaning: 'giáo viên', exEn: 'Listen to the teacher carefully.', exVi: 'Hãy lắng nghe giáo viên giảng bài cẩn thận.' },
            { word: 'student', pos: 'n', meaning: 'học sinh', exEn: 'Every student has a notebook.', exVi: 'Mỗi học sinh đều có một quyển vở ghi.' },
            { word: 'read', pos: 'v', meaning: 'đọc', exEn: 'Read the new words aloud.', exVi: 'Hãy đọc to các từ vựng mới lên.' },
            { word: 'write', pos: 'v', meaning: 'viết', exEn: 'Write five sentences in your notebook.', exVi: 'Hãy viết năm câu vào vở của em.' },
            { word: 'listen', pos: 'v', meaning: 'nghe', exEn: 'Listen and repeat after me.', exVi: 'Hãy nghe và nhắc lại theo chị nhé.' },
            { word: 'ask', pos: 'v', meaning: 'hỏi', exEn: 'Ask me if you do not understand.', exVi: 'Hãy hỏi chị nếu em chưa hiểu bài.' },
            { word: 'answer', pos: 'n/v', meaning: 'câu trả lời / trả lời', exEn: 'Check your answer again.', exVi: 'Hãy kiểm tra lại câu trả lời của em một lần nữa.' },
            { word: 'class', pos: 'n', meaning: 'lớp học / buổi học', exEn: 'Our class starts at six o’clock.', exVi: 'Buổi học của chúng ta bắt đầu lúc 6 giờ.' },
            { word: 'learn', pos: 'v', meaning: 'học', exEn: 'We learn twenty-five new words today.', exVi: 'Hôm nay chúng ta học hai mươi lăm từ mới.' },
            { word: 'pencil', pos: 'n', meaning: 'bút chì', exEn: 'Draw a line with your pencil.', exVi: 'Hãy kẻ một đường thẳng bằng bút chì của em.' },
            { word: 'ruler', pos: 'n', meaning: 'thước kẻ', exEn: 'Put the ruler in your school bag.', exVi: 'Hãy cất thước kẻ vào cặp sách của em.' },
            { word: 'eraser', pos: 'n', meaning: 'cục tẩy', exEn: 'Use an eraser to clean the mistake.', exVi: 'Hãy dùng cục tẩy để xóa lỗi viết sai.' },
            { word: 'board', pos: 'n', meaning: 'cái bảng', exEn: 'Look at the words on the board.', exVi: 'Hãy nhìn vào các từ trên bảng.' },
            { word: 'chair', pos: 'n', meaning: 'cái ghế', exEn: 'Sit nicely on your chair.', exVi: 'Hãy ngồi ngay ngắn trên ghế của em.' },
            { word: 'page', pos: 'n', meaning: 'trang giấy / trang sách', exEn: 'Read the story on page five.', exVi: 'Hãy đọc câu chuyện ở trang số năm.' },
            { word: 'word', pos: 'n', meaning: 'từ vựng', exEn: 'Spell this word slowly.', exVi: 'Hãy đánh vần từ này thật chậm nhé.' },
            { word: 'letter', pos: 'n', meaning: 'chữ cái', exEn: 'Fill in the missing letter.', exVi: 'Hãy điền chữ cái còn thiếu vào chỗ trống.' },
            { word: 'school', pos: 'n', meaning: 'trường học', exEn: 'She walks to school every morning.', exVi: 'Em ấy đi bộ đến trường vào mỗi buổi sáng.' },
            { word: 'friend', pos: 'n', meaning: 'bạn bè', exEn: 'Practice speaking with your friend.', exVi: 'Hãy luyện nói cùng với bạn của em.' },
            { word: 'lesson', pos: 'n', meaning: 'bài học', exEn: 'Today’s lesson is very easy.', exVi: 'Bài học hôm nay rất dễ hiểu.' },
            { word: 'paper', pos: 'n', meaning: 'tờ giấy', exEn: 'Write your code on the paper.', exVi: 'Hãy viết mã học sinh của em lên tờ giấy.' },
            { word: 'test', pos: 'n', meaning: 'bài kiểm tra nhỏ', exEn: 'You did very well on the test.', exVi: 'Em đã làm rất tốt trong bài kiểm tra.' }
        ]
    },
    A2: {
        business: [
            { word: 'customer', pos: 'n', meaning: 'khách hàng', exEn: 'We always listen to our customers carefully.', exVi: 'Chúng tôi luôn lắng nghe khách hàng của mình một cách cẩn thận.' },
            { word: 'product', pos: 'n', meaning: 'sản phẩm', exEn: 'Fresh fried chicken is our best-selling product.', exVi: 'Gà rán tươi nóng là sản phẩm bán chạy nhất của chúng tôi.' },
            { word: 'price', pos: 'n', meaning: 'giá bán / mức giá', exEn: 'The price of this combo is very reasonable.', exVi: 'Mức giá của phần ăn này rất hợp lý.' },
            { word: 'order', pos: 'n/v', meaning: 'đơn hàng / đặt hàng', exEn: 'The customer placed an online order five minutes ago.', exVi: 'Khách hàng đã đặt một đơn hàng trực tuyến cách đây 5 phút.' },
            { word: 'delivery', pos: 'n', meaning: 'giao hàng', exEn: 'We offer free delivery within three kilometers.', exVi: 'Chúng tôi miễn phí giao hàng trong bán kính ba ki-lô-mét.' },
            { word: 'profit', pos: 'n', meaning: 'lợi nhuận / tiền lãi', exEn: 'Good quality helps the shop increase its profit.', exVi: 'Chất lượng tốt giúp cửa hàng tăng lợi nhuận.' },
            { word: 'cost', pos: 'n/v', meaning: 'chi phí / trị giá', exEn: 'We calculate the total cost at the end of every shift.', exVi: 'Chúng tôi tính tổng chi phí vào cuối mỗi ca làm việc.' },
            { word: 'bill', pos: 'n', meaning: 'hóa đơn thanh toán', exEn: 'The total bill for your meal is sixty thousand dong.', exVi: 'Tổng hóa đơn cho bữa ăn của bạn là sáu mươi nghìn đồng.' },
            { word: 'service', pos: 'n', meaning: 'dịch vụ phục vụ', exEn: 'Fast service makes our customers happy.', exVi: 'Dịch vụ nhanh chóng làm khách hàng của chúng tôi hài lòng.' },
            { word: 'quality', pos: 'n', meaning: 'chất lượng', exEn: 'I always check the food quality at 4 PM.', exVi: 'Tôi luôn kiểm tra chất lượng thực phẩm vào lúc 4 giờ chiều.' },
            { word: 'staff', pos: 'n', meaning: 'nhân viên', exEn: 'Our staff prepare everything cleanly and quickly.', exVi: 'Nhân viên của chúng tôi chuẩn bị mọi thứ sạch sẽ và nhanh chóng.' },
            { word: 'menu', pos: 'n', meaning: 'thực đơn', exEn: 'There are seven main dishes on our menu.', exVi: 'Có bảy món chính trong thực đơn của chúng tôi.' },
            { word: 'cash', pos: 'n', meaning: 'tiền mặt', exEn: 'Do you want to pay in cash or by QR code?', exVi: 'Bạn muốn thanh toán bằng tiền mặt hay quét mã QR?' },
            { word: 'discount', pos: 'n', meaning: 'giảm giá / chiết khấu', exEn: 'We do not offer any discount today.', exVi: 'Hôm nay bên tiệm không có chương trình giảm giá.' },
            { word: 'sauce', pos: 'n', meaning: 'nước sốt ăn kèm', exEn: 'Sweet and sour sauce is free with every chicken dish.', exVi: 'Sốt chua ngọt được tặng miễn phí kèm mỗi phần gà.' },
            { word: 'crispy', pos: 'adj', meaning: 'giòn rụm', exEn: 'Customers love our crispy fried chicken wings.', exVi: 'Khách hàng rất thích món cánh gà rán giòn rụm của chúng tôi.' },
            { word: 'spicy', pos: 'adj', meaning: 'có vị cay', exEn: 'Would you like spicy sauce or cheese sauce?', exVi: 'Bạn muốn dùng sốt cay hay sốt phô mai?' },
            { word: 'fresh', pos: 'adj', meaning: 'tươi ngon', exEn: 'We select fresh potatoes every morning.', exVi: 'Chúng tôi chọn lọc khoai tây tươi ngon vào mỗi buổi sáng.' },
            { word: 'prepare', pos: 'v', meaning: 'chuẩn bị / sơ chế', exEn: 'It takes five minutes to prepare your order.', exVi: 'Mất tối đa năm phút để chuẩn bị đơn hàng của bạn.' },
            { word: 'pack', pos: 'v/n', meaning: 'đóng gói / gói hàng', exEn: 'Please pack the hot food carefully for delivery.', exVi: 'Vui lòng đóng gói đồ ăn nóng thật cẩn thận để giao đi.' },
            { word: 'check', pos: 'v/n', meaning: 'kiểm tra', exEn: 'The owner checks the counter before opening.', exVi: 'Chủ tiệm kiểm tra quầy hàng trước giờ mở bán.' },
            { word: 'shift', pos: 'n', meaning: 'ca làm việc', exEn: 'The afternoon shift starts at four o’clock.', exVi: 'Ca làm việc buổi chiều bắt đầu lúc bốn giờ.' },
            { word: 'counter', pos: 'n', meaning: 'quầy bán hàng', exEn: 'Please keep the counter clean and neat.', exVi: 'Vui lòng giữ quầy bán hàng sạch sẽ và gọn gàng.' },
            { word: 'choose', pos: 'v', meaning: 'lựa chọn', exEn: 'You can choose sliced potatoes or French fries.', exVi: 'Bạn có thể lựa chọn khoai lát hoặc khoai sợi.' },
            { word: 'message', pos: 'n', meaning: 'tin nhắn', exEn: 'I draft a polite message to confirm the order.', exVi: 'Tôi soạn nháp một tin nhắn lịch sự để xác nhận đơn hàng.' }
        ],
        school: [
            { word: 'homework', pos: 'n', meaning: 'bài tập về nhà', exEn: 'Remember to finish your homework before 6 PM.', exVi: 'Nhớ hoàn thành bài tập về nhà trước 6 giờ tối nhé.' },
            { word: 'example', pos: 'n', meaning: 'ví dụ', exEn: 'Now I will give you an easy example.', exVi: 'Bây giờ chị sẽ đưa cho em một ví dụ dễ hiểu.' },
            { word: 'dictionary', pos: 'n', meaning: 'từ điển', exEn: 'You can look up new words in the dictionary.', exVi: 'Em có thể tra các từ mới trong từ điển.' },
            { word: 'practice', pos: 'v/n', meaning: 'luyện tập / thực hành', exEn: 'We practice speaking English three times a week.', exVi: 'Chúng ta luyện nói tiếng Anh ba buổi một tuần.' },
            { word: 'exam', pos: 'n', meaning: 'kỳ thi / bài kiểm tra', exEn: 'She is preparing for the midterm exam.', exVi: 'Em ấy đang chuẩn bị cho kỳ thi giữa kì.' },
            { word: 'grammar', pos: 'n', meaning: 'ngữ pháp', exEn: 'This grammar rule is very important.', exVi: 'Quy tắc ngữ pháp này rất quan trọng.' },
            { word: 'correct', pos: 'adj/v', meaning: 'đúng / sửa lỗi', exEn: 'Read the sentence and correct the mistake.', exVi: 'Hãy đọc câu văn và sửa lại lỗi sai.' },
            { word: 'notebook', pos: 'n', meaning: 'quyển vở ghi chép', exEn: 'Write the new formula in your notebook.', exVi: 'Hãy viết công thức mới vào vở của em.' },
            { word: 'subject', pos: 'n', meaning: 'môn học', exEn: 'Math and English are my favorite subjects.', exVi: 'Toán và Tiếng Anh là những môn học yêu thích của em.' },
            { word: 'improve', pos: 'v', meaning: 'cải thiện / tiến bộ', exEn: 'Your test score will improve soon.', exVi: 'Điểm kiểm tra của em sẽ sớm tiến bộ thôi.' },
            { word: 'mistake', pos: 'n', meaning: 'lỗi sai', exEn: 'Be careful not to repeat the same mistake.', exVi: 'Hãy cẩn thận đừng lặp lại cùng một lỗi sai nhé.' },
            { word: 'review', pos: 'v/n', meaning: 'ôn tập', exEn: 'Let us review the vocabulary before the test.', exVi: 'Chúng ta hãy ôn tập lại từ vựng trước bài kiểm tra nhé.' },
            { word: 'exercise', pos: 'n', meaning: 'bài tập rèn luyện', exEn: 'Complete ten small exercises in this worksheet.', exVi: 'Hãy hoàn thành mười bài tập nhỏ trong phiếu này.' },
            { word: 'sentence', pos: 'n', meaning: 'câu văn', exEn: 'Translate this sentence into Vietnamese.', exVi: 'Hãy dịch câu văn này sang tiếng Việt.' },
            { word: 'meaning', pos: 'n', meaning: 'ý nghĩa', exEn: 'Do you know the meaning of this word?', exVi: 'Em có biết ý nghĩa của từ này không?' },
            { word: 'explain', pos: 'v', meaning: 'giải thích', exEn: 'I will explain the formula again.', exVi: 'Chị sẽ giải thích lại công thức này một lần nữa.' },
            { word: 'understand', pos: 'v', meaning: 'hiểu bài', exEn: 'Ask me immediately if you do not understand.', exVi: 'Hãy hỏi lại chị ngay nếu em chưa hiểu bài nhé.' },
            { word: 'remember', pos: 'v', meaning: 'ghi nhớ', exEn: 'Flashcards help you remember words faster.', exVi: 'Thẻ từ giúp em ghi nhớ từ vựng nhanh hơn.' },
            { word: 'complete', pos: 'v/adj', meaning: 'hoàn thành / đầy đủ', exEn: 'Complete the table with the correct words.', exVi: 'Hãy hoàn thành bảng với các từ đúng.' },
            { word: 'score', pos: 'n', meaning: 'điểm số', exEn: 'She got a high score in the final exam.', exVi: 'Em ấy đạt điểm số cao trong kỳ thi cuối kì.' },
            { word: 'schedule', pos: 'n', meaning: 'lịch học', exEn: 'Our study schedule is three times a week.', exVi: 'Lịch học của chúng ta là ba buổi một tuần.' },
            { word: 'topic', pos: 'n', meaning: 'chủ đề', exEn: 'Today’s topic is business vocabulary.', exVi: 'Chủ đề hôm nay là từ vựng về kinh doanh.' },
            { word: 'level', pos: 'n', meaning: 'trình độ / cấp độ', exEn: 'This lesson is designed for A2 level.', exVi: 'Bài giảng này được thiết kế cho trình độ A2.' },
            { word: 'careful', pos: 'adj', meaning: 'cẩn thận', exEn: 'Be careful with plural nouns.', exVi: 'Hãy cẩn thận với các danh từ số nhiều.' },
            { word: 'progress', pos: 'n', meaning: 'sự tiến bộ', exEn: 'I will report your learning progress to your mother.', exVi: 'Chị sẽ báo cáo sự tiến bộ học tập của em cho mẹ nhé.' }
        ]
    },
    B1: {
        business: [
            { word: 'revenue', pos: 'n', meaning: 'doanh thu', exEn: 'Weekly revenue is recorded carefully in the management book.', exVi: 'Doanh thu hàng tuần được ghi chép cẩn thận trong sổ quản lý.' },
            { word: 'supplier', pos: 'n', meaning: 'nhà cung cấp / mối sỉ', exEn: 'Our supplier delivers fresh ingredients three times a week.', exVi: 'Nhà cung cấp của chúng tôi giao nguyên liệu tươi ba lần một tuần.' },
            { word: 'inventory', pos: 'n', meaning: 'hàng tồn kho / kiểm kê', exEn: 'We check the inventory every night to plan the next order.', exVi: 'Chúng tôi kiểm tra hàng tồn kho mỗi tối để lên đơn nhập tiếp theo.' },
            { word: 'promote', pos: 'v', meaning: 'quảng bá / xúc tiến', exEn: 'High food quality helps promote our brand naturally.', exVi: 'Chất lượng đồ ăn cao giúp quảng bá thương hiệu của chúng ta một cách tự nhiên.' },
            { word: 'expense', pos: 'n', meaning: 'khoản chi phí vận hành', exEn: 'We need to balance daily income and expenses.', exVi: 'Chúng ta cần cân đối khoản thu và chi phí hàng ngày.' },
            { word: 'consumer', pos: 'n', meaning: 'người tiêu dùng', exEn: 'Young consumers prefer fast and clean packaging.', exVi: 'Người tiêu dùng trẻ tuổi ưa chuộng bao bì sạch sẽ và nhanh gọn.' },
            { word: 'feedback', pos: 'n', meaning: 'phản hồi của khách', exEn: 'Positive feedback from customers motivates our team.', exVi: 'Phản hồi tích cực từ khách hàng tạo động lực cho đội ngũ của chúng tôi.' },
            { word: 'target', pos: 'n/v', meaning: 'mục tiêu', exEn: 'Our target is to prepare every order within five minutes.', exVi: 'Mục tiêu của chúng tôi là chuẩn bị mỗi đơn hàng trong vòng năm phút.' },
            { word: 'maintain', pos: 'v', meaning: 'duy trì / giữ vững', exEn: 'It is important to maintain consistent product quality.', exVi: 'Việc duy trì chất lượng sản phẩm đồng đều là rất quan trọng.' },
            { word: 'distribute', pos: 'v', meaning: 'phân phối / giao phát', exEn: 'Local partners distribute fresh potatoes to our store.', exVi: 'Các đối tác địa phương phân phối khoai tây tươi đến cửa hàng chúng tôi.' },
            { word: 'invoice', pos: 'n', meaning: 'hóa đơn chứng từ', exEn: 'Please keep the supplier invoice for accounting.', exVi: 'Vui lòng giữ lại hóa đơn nhà cung cấp để tổng kết sổ sách.' },
            { word: 'requirement', pos: 'n', meaning: 'yêu cầu / tiêu chuẩn', exEn: 'Cleanliness is our top requirement in the kitchen.', exVi: 'Sự sạch sẽ là yêu cầu hàng đầu của chúng tôi trong khu bếp.' },
            { word: 'ingredient', pos: 'n', meaning: 'nguyên liệu chế biến', exEn: 'All input ingredients are inspected before the afternoon shift.', exVi: 'Tất cả nguyên liệu đầu vào đều được kiểm tra trước ca chiều.' },
            { word: 'packaging', pos: 'n', meaning: 'bao bì đóng gói', exEn: 'Clean packaging keeps the fried chicken hot and crispy.', exVi: 'Bao bì đóng gói sạch sẽ giữ cho gà rán luôn nóng và giòn.' },
            { word: 'confirm', pos: 'v', meaning: 'xác nhận', exEn: 'We always confirm the total bill before shipping.', exVi: 'Chúng tôi luôn xác nhận tổng hóa đơn trước khi giao hàng.' },
            { word: 'distance', pos: 'n', meaning: 'khoảng cách', exEn: 'Delivery is free for a distance under three kilometers.', exVi: 'Giao hàng miễn phí cho khoảng cách dưới ba ki-lô-mét.' },
            { word: 'platform', pos: 'n', meaning: 'nền tảng ứng dụng', exEn: 'Customers can order through food delivery platforms.', exVi: 'Khách hàng có thể đặt món qua các nền tảng ứng dụng giao đồ ăn.' },
            { word: 'manage', pos: 'v', meaning: 'quản lý / điều hành', exEn: 'She manages both tutoring classes and a small food shop.', exVi: 'Cô ấy quản lý cả lớp dạy kèm và một tiệm đồ ăn nhỏ.' },
            { word: 'schedule', pos: 'n/v', meaning: 'lên lịch / kế hoạch', exEn: 'We schedule potato preparation every two days.', exVi: 'Chúng tôi lên lịch sơ chế khoai tây hai ngày một lần.' },
            { word: 'quantity', pos: 'n', meaning: 'số lượng / định lượng', exEn: 'Check the remaining quantity of cheese powder.', exVi: 'Hãy kiểm tra số lượng bột phô mai còn lại.' },
            { word: 'satisfy', pos: 'v', meaning: 'làm hài lòng', exEn: 'Delicious sauces help satisfy different tastes.', exVi: 'Các loại nước sốt ngon giúp làm hài lòng nhiều khẩu vị khác nhau.' },
            { word: 'summary', pos: 'n', meaning: 'bản tổng kết', exEn: 'We make a financial summary at half past ten every night.', exVi: 'Chúng tôi làm bản tổng kết thu chi vào 10 rưỡi mỗi tối.' },
            { word: 'support', pos: 'v/n', meaning: 'hỗ trợ', exEn: 'Contact us anytime if you need quick support.', exVi: 'Hãy liên hệ với chúng tôi bất cứ lúc nào nếu bạn cần hỗ trợ nhanh.' },
            { word: 'standard', pos: 'n/adj', meaning: 'tiêu chuẩn', exEn: 'Every dish must meet our hygiene standard.', exVi: 'Mỗi món ăn đều phải đáp ứng tiêu chuẩn vệ sinh của chúng tôi.' },
            { word: 'payment', pos: 'n', meaning: 'việc thanh toán', exEn: 'QR code payment is fast and convenient.', exVi: 'Thanh toán bằng mã QR vừa nhanh vừa tiện lợi.' }
        ]
    },
    B2: {
        business: [
            { word: 'sustainability', pos: 'n', meaning: 'tính bền vững', exEn: 'Financial sustainability requires strict cost control.', exVi: 'Tính bền vững về tài chính đòi hỏi sự kiểm soát chi phí chặt chẽ.' },
            { word: 'strategy', pos: 'n', meaning: 'chiến lược', exEn: 'Focusing on core product quality is an effective business strategy.', exVi: 'Tập trung vào chất lượng sản phẩm cốt lõi là một chiến lược kinh doanh hiệu quả.' },
            { word: 'optimize', pos: 'v', meaning: 'tối ưu hóa', exEn: 'We optimize our morning preparation process to save time.', exVi: 'Chúng tôi tối ưu hóa quy trình sơ chế buổi sáng để tiết kiệm thời gian.' },
            { word: 'productivity', pos: 'n', meaning: 'năng suất làm việc', exEn: 'Clear checklists help improve staff productivity.', exVi: 'Danh sách kiểm tra rõ ràng giúp nâng cao năng suất của nhân viên.' },
            { word: 'competitive', pos: 'adj', meaning: 'có tính cạnh tranh', exEn: 'Offering free homemade sauces gives us a competitive advantage.', exVi: 'Việc tặng kèm nước sốt tự làm miễn phí mang lại cho chúng tôi lợi thế cạnh tranh.' },
            { word: 'fluctuate', pos: 'v', meaning: 'biến động / lên xuống', exEn: 'Ingredient prices may fluctuate depending on the season.', exVi: 'Giá nguyên liệu đầu vào có thể biến động tùy theo mùa.' },
            { word: 'reputation', pos: 'n', meaning: 'uy tín / danh tiếng', exEn: 'A store builds its reputation through consistent hygiene and taste.', exVi: 'Một cửa hàng xây dựng uy tín thông qua vệ sinh và hương vị ổn định.' },
            { word: 'delegate', pos: 'v', meaning: 'phân quyền / giao việc', exEn: 'The owner delegates daily frying tasks to trained staff.', exVi: 'Chủ tiệm giao các công việc đứng chiên hàng ngày cho nhân viên đã qua đào tạo.' },
            { word: 'objective', pos: 'n/adj', meaning: 'mục tiêu trọng tâm / khách quan', exEn: 'Our primary objective is customer satisfaction.', exVi: 'Mục tiêu trọng tâm của chúng tôi là sự hài lòng của khách hàng.' },
            { word: 'supervise', pos: 'v', meaning: 'giám sát / kiểm tra', exEn: 'I supervise the counter and input quality four times a week.', exVi: 'Tôi giám sát quầy hàng và chất lượng đầu vào bốn lần mỗi tuần.' },
            { word: 'margin', pos: 'n', meaning: 'biên lợi nhuận', exEn: 'Reducing waste directly improves our profit margin.', exVi: 'Giảm thiểu hao hụt giúp cải thiện trực tiếp biên lợi nhuận của chúng ta.' },
            { word: 'procurement', pos: 'n', meaning: 'thu mua / nhập hàng đầu vào', exEn: 'Careful procurement ensures only the best potatoes are selected.', exVi: 'Khâu thu mua kỹ lưỡng đảm bảo chỉ những củ khoai tây tốt nhất được chọn lọc.' },
            { word: 'efficiency', pos: 'n', meaning: 'hiệu suất vận hành', exEn: 'Pre-frying potato slices increases kitchen efficiency during peak hours.', exVi: 'Việc chiên sơ khoai lát giúp tăng hiệu suất nhà bếp vào giờ cao điểm.' },
            { word: 'consistency', pos: 'n', meaning: 'sự đồng bộ / nhất quán', exEn: 'Consistency in flavor keeps loyal customers coming back.', exVi: 'Sự đồng bộ về hương vị giữ chân khách hàng thân thiết quay lại.' },
            { word: 'accountability', pos: 'n', meaning: 'trách nhiệm giải trình / đối soát', exEn: 'End-of-shift cash reconciliation ensures full accountability.', exVi: 'Việc đối soát tiền cuối ca đảm bảo trách nhiệm rõ ràng.' },
            { word: 'allocation', pos: 'n', meaning: 'sự phân bổ', exEn: 'Smart time allocation helps balance teaching and business.', exVi: 'Phân bổ thời gian thông minh giúp cân bằng giữa việc dạy học và kinh doanh.' },
            { word: 'criterion', pos: 'n', meaning: 'tiêu chí đánh giá', exEn: 'Freshness is our most important criterion when selecting suppliers.', exVi: 'Độ tươi ngon là tiêu chí quan trọng nhất của chúng tôi khi chọn nhà cung cấp.' },
            { word: 'streamline', pos: 'v', meaning: 'tinh gọn quy trình', exEn: 'Digital templates help streamline daily order confirmation.', exVi: 'Các mẫu tin nhắn sẵn giúp tinh gọn quy trình xác nhận đơn hàng ngày.' },
            { word: 'verify', pos: 'v', meaning: 'xác minh / kiểm duyệt', exEn: 'The owner always verifies the final draft before sending.', exVi: 'Chủ tiệm luôn kiểm duyệt bản nháp cuối cùng trước khi bấm gửi.' },
            { word: 'confidentiality', pos: 'n', meaning: 'tính bảo mật thông tin', exEn: 'Using anonymous codes protects customer confidentiality.', exVi: 'Sử dụng mã ẩn danh giúp bảo vệ tính bảo mật thông tin khách hàng.' },
            { word: 'retention', pos: 'n', meaning: 'sự giữ chân khách hàng', exEn: 'Thoughtful after-sales care improves customer retention.', exVi: 'Chăm sóc sau bán chu đáo giúp nâng cao tỷ lệ giữ chân khách hàng.' },
            { word: 'inspection', pos: 'n', meaning: 'sự kiểm định / rà soát', exEn: 'A fifteen-minute inspection at 4 PM prevents quality issues.', exVi: 'Mười lăm phút rà soát lúc 4 giờ chiều giúp ngăn ngừa các lỗi chất lượng.' },
            { word: 'turnover', pos: 'n', meaning: 'tốc độ luân chuyển hàng', exEn: 'Preparation frequency depends on daily stock turnover.', exVi: 'Tần suất sơ chế phụ thuộc vào tốc độ bán hàng mỗi ngày.' },
            { word: 'prioritize', pos: 'v', meaning: 'ưu tiên', exEn: 'We prioritize dine-in quality and clean packaging.', exVi: 'Chúng tôi ưu tiên chất lượng ăn tại quán và đóng gói sạch sẽ.' },
            { word: 'sustainable', pos: 'adj', meaning: 'ổn định lâu dài', exEn: 'A well-organized workflow creates a sustainable small business.', exVi: 'Một quy trình tổ chức tốt tạo nên mô hình kinh doanh nhỏ ổn định lâu dài.' }
        ]
    }
};

// Khởi tạo ứng dụng khi mở trang
window.addEventListener('DOMContentLoaded', () => {
    switchSubject('eng');
    loadSampleExample();
});

// Đổi môn học (Tiếng Anh <-> Ngữ Văn)
function switchSubject(subj) {
    currentSubject = subj;
    document.getElementById('tabEng').classList.toggle('active', subj === 'eng');
    document.getElementById('tabVan').classList.toggle('active', subj === 'van');

    // Cập nhật danh sách cấp độ
    const levelSelect = document.getElementById('levelSelect');
    levelSelect.innerHTML = '';
    SUBJECT_CONFIG[subj].levels.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.value;
        opt.textContent = item.label;
        levelSelect.appendChild(opt);
    });

    // Cập nhật mã ẩn danh gợi ý
    document.getElementById('studentCode').value = SUBJECT_CONFIG[subj].defaultCode;

    // Đổi nhãn ô nhập từ vựng/ngữ liệu
    const vocabLabel = document.querySelector('#vocabInputGroup label');
    const customVocab = document.getElementById('customVocab');
    if (subj === 'eng') {
        vocabLabel.innerHTML = 'File từ vựng của bạn <span class="optional-tag">(Tùy chọn - Không kèm file máy tự soạn 20-30 thẻ cố định theo đúng 1 Level bạn chọn)</span>:';
        customVocab.placeholder = 'Nếu để trống, máy tự chọn 20-30 thẻ từ vựng cố định của đúng 1 Level đã chọn (VD: chọn A2 chỉ lấy đúng 25 từ chuẩn A2).\nNếu tự nhập, gõ mỗi dòng 1 từ theo dạng: Từ - Từ loại - Nghĩa tiếng Việt';
    } else {
        vocabLabel.innerHTML = 'Ngữ liệu / Đề bài riêng của bạn <span class="optional-tag">(Tùy chọn - Để trống máy tự tạo ngữ liệu & bộ từ diễn đạt)</span>:';
        customVocab.placeholder = 'Dán đoạn thơ/văn bản đọc hiểu hoặc câu hỏi nghị luận riêng của bạn vào đây (nếu có)...';
    }

    // Tạo các nút chủ đề gợi ý nhanh
    const presetContainer = document.getElementById('presetContainer');
    presetContainer.innerHTML = '';
    SUBJECT_CONFIG[subj].presets.forEach(p => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip';
        chip.textContent = p.label;
        chip.onclick = () => {
            document.getElementById('topicInput').value = p.topic;
            document.getElementById('levelSelect').value = p.level;
            handleGenerate(new Event('submit'));
        };
        presetContainer.appendChild(chip);
    });
}

// Đọc file .txt / .csv / .md do giáo viên tải lên
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('customVocab').value = e.target.result;
        showToast('Đã nạp nội dung từ file: ' + file.name);
    };
    reader.readAsText(file, 'UTF-8');
}

function clearVocabInput() {
    document.getElementById('vocabFile').value = '';
    document.getElementById('customVocab').value = '';
}

// Chạy ngay Ví dụ mẫu trong dac-ta-may-soan-bai.md
function loadSampleExample() {
    switchSubject('eng');
    document.getElementById('levelSelect').value = 'A2';
    document.getElementById('studentCode').value = 'HS26-09-A';
    document.getElementById('topicInput').value = 'Từ vựng về Kinh Doanh (Business Vocabulary)';
    document.getElementById('toneSelect').value = 'chi_em_912';
    handleGenerate(new Event('submit'));
}

// Xử lý sự kiện bấm nút Soạn Bản Nháp
function handleGenerate(event) {
    if (event) event.preventDefault();

    const level = document.getElementById('levelSelect').value;
    const studentCode = sanitizePrivacy(document.getElementById('studentCode').value.trim() || 'HS26-09-A');
    const topic = document.getElementById('topicInput').value.trim() || 'Từ vựng về Kinh Doanh';
    const customText = document.getElementById('customVocab').value.trim();
    const toneKey = document.getElementById('toneSelect').value;

    // Đặt lại trạng thái về BẢN NHÁP CHỜ DUYỆT
    isApproved = false;
    const badge = document.getElementById('approvalBadge');
    badge.textContent = '⏳ Trạng thái: BẢN NHÁP CHỜ DUYỆT';
    badge.classList.remove('approved');

    if (currentSubject === 'eng') {
        generateEnglishLesson(topic, level, studentCode, customText, toneKey);
    } else {
        generateLiteratureLesson(topic, level, studentCode, customText, toneKey);
    }

    updateChatDraft(topic, level, studentCode, toneKey);
}

// Bộ lọc bảo mật: Không cho phép lưu số điện thoại vào hồ sơ
function sanitizePrivacy(input) {
    return input.replace(/(0|\+84)[0-9]{8,10}/g, '[ĐÃ ẨN SĐT]');
}

// Lấy danh sách từ vựng: Nếu không kèm file, chỉ lấy cố định theo đúng 1 Level giáo viên đã chọn (VD: chọn A2 chỉ ra 12 thẻ chuẩn A2)
function resolveVocabularyList(topic, level, customText) {
    if (customText) {
        const lines = customText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const parsed = lines.map((line, idx) => {
            const parts = line.split(/[-–|:;,	]+/).map(s => s.trim()).filter(Boolean);
            const word = parts[0] || `word_${idx + 1}`;
            const pos = parts.length >= 3 ? parts[1] : 'n/v';
            const meaning = parts.length >= 3 ? parts.slice(2).join(' - ') : (parts[1] || 'nghĩa tiếng Việt');
            return {
                word,
                pos,
                meaning,
                exEn: `We use the word "${word}" in ${topic} contexts (Level ${level}).`,
                exVi: `Chúng ta sử dụng từ "${word}" (${meaning}) trong ngữ cảnh ${topic} (Trình độ ${level}).`
            };
        });
        if (parsed.length > 0) return parsed.slice(0, 30);
    }

    // Chỉ lấy kho từ vựng cố định của đúng Level được chọn (A1, A2, B1 hoặc B2)
    const levelPack = VOCAB_BY_LEVEL[level] || VOCAB_BY_LEVEL.A2;
    const t = topic.toLowerCase();

    if ((t.includes('trường') || t.includes('school') || t.includes('học')) && levelPack.school) {
        return levelPack.school;
    }

    return levelPack.business;
}

// ============================================================================
// 1. SOẠN GIÁO ÁN TIẾNG ANH (A1 - B2, 45 PHÚT)
// ============================================================================
function generateEnglishLesson(topic, level, studentCode, customText, toneKey) {
    const vocabList = resolveVocabularyList(topic, level, customText);
    currentFlashcards = vocabList;
    currentCardIndex = 0;
    renderCurrentFlashcard();

    const toneGreeting = getToneInstruction(toneKey);

    // Tạo bảng Flashcard (10 - 12 thẻ)
    const flashcardRows = vocabList.map((v, i) => `
        <tr>
            <td><strong>#${i + 1}</strong></td>
            <td><strong>${v.word}</strong></td>
            <td><code>(${v.pos})</code></td>
            <td>${v.meaning}</td>
            <td><em>${v.exEn}</em></td>
        </tr>
    `).join('');

    // Tạo 30 câu dịch chéo xen kẽ (15 câu Anh -> Việt, 15 câu Việt -> Anh) - Đã sửa Lỗi số 1
    const crossItems = [];
    const crossAnswers = [];
    for (let i = 0; i < 30; i++) {
        const item = vocabList[i % vocabList.length];
        if (i % 2 === 0) {
            // Câu lẻ (1, 3, 5, ..., 29): Tiếng Anh -> Dịch sang Tiếng Việt
            crossItems.push(`<li><strong>Câu ${i + 1} [Anh ➔ Việt]:</strong> Dịch câu sau sang tiếng Việt: <em>"${item.exEn}"</em> (Từ trọng tâm: <strong>${item.word}</strong>)</li>`);
            crossAnswers.push(`<li><strong>Câu ${i + 1} [Anh ➔ Việt]:</strong> ${item.exVi}</li>`);
        } else {
            // Câu chẵn (2, 4, 6, ..., 30): Tiếng Việt -> Dịch sang Tiếng Anh
            crossItems.push(`<li><strong>Câu ${i + 1} [Việt ➔ Anh]:</strong> Dịch câu sau sang tiếng Anh (có dùng từ <strong>${item.word}</strong>): <em>"${item.exVi}"</em></li>`);
            crossAnswers.push(`<li><strong>Câu ${i + 1} [Việt ➔ Anh]:</strong> ${item.exEn}</li>`);
        }
    }

    // Sinh 5 dạng bài tập nhỏ, mỗi dạng đủ 10 câu (Đã sửa Lỗi số 3)
    const d1Items = [], d1Ans = [];
    const d2Items = [], d2Ans = [];
    const d3Items = [], d3Ans = [];
    const d4Items = [], d4Ans = [];
    const d5Items = [], d5Ans = [];

    for (let k = 0; k < 10; k++) {
        const wMain = vocabList[k % vocabList.length];
        const wAlt1 = vocabList[(k + 1) % vocabList.length];
        const wAlt2 = vocabList[(k + 2) % vocabList.length];
        const wAlt3 = vocabList[(k + 3) % vocabList.length];

        // Dạng 1: Điền từ vào chỗ trống (Ngữ pháp & Loại từ - 10 câu)
        d1Items.push(`<li><strong>Câu ${k + 1}:</strong> Điền từ đúng vào câu: <em>"${wMain.exEn.replace(new RegExp(wMain.word, 'i'), '__________')}"</em> (Gợi ý lựa chọn: <strong>${wMain.word}</strong> / <strong>${wAlt1.word}</strong>)</li>`);
        d1Ans.push(`<li><strong>Dạng 1 - Câu ${k + 1}:</strong> <code>${wMain.word}</code> (${wMain.meaning} - loại từ: ${wMain.pos}).</li>`);

        // Dạng 2: Tìm và sửa lỗi sai trong câu (10 câu)
        d2Items.push(`<li><strong>Câu ${k + 1}:</strong> Tìm lỗi sai trong câu: <em>"Every day, we <u>checks</u> (A) the <u>${wMain.word}</u> (B) carefully <u>in</u> (C) our <u>lesson</u> (D)."</em> ➔ Sửa lỗi: ...............</li>`);
        d2Ans.push(`<li><strong>Dạng 2 - Câu ${k + 1}:</strong> Sai ở <strong>(A) checks</strong> ➔ sửa thành <strong>check</strong> (Chủ ngữ "we" đi với động từ nguyên mẫu).</li>`);

        // Dạng 3: Trắc nghiệm khoanh A / B / C / D (10 câu)
        d3Items.push(`<li><strong>Câu ${k + 1}:</strong> Từ tiếng Anh nào dưới đây mang nghĩa là <strong>"${wMain.meaning}"</strong> (${wMain.pos})?<br>A. ${wMain.word} &nbsp;&nbsp;&nbsp; B. ${wAlt1.word} &nbsp;&nbsp;&nbsp; C. ${wAlt2.word} &nbsp;&nbsp;&nbsp; D. ${wAlt3.word}</li>`);
        d3Ans.push(`<li><strong>Dạng 3 - Câu ${k + 1}:</strong> Chọn <strong>A (${wMain.word})</strong> = ${wMain.meaning}.</li>`);

        // Dạng 4: Kiểm tra mệnh đề Đúng / Sai (True / False - 10 câu)
        if (k % 2 === 0) {
            d4Items.push(`<li><strong>Câu ${k + 1}:</strong> Từ vựng "<strong>${wMain.word}</strong>" (${wMain.pos}) trong tiếng Việt có nghĩa là "<strong>${wMain.meaning}</strong>". [ <strong>True / False</strong> ]</li>`);
            d4Ans.push(`<li><strong>Dạng 4 - Câu ${k + 1}:</strong> <strong>True (Đúng)</strong> (${wMain.word} = ${wMain.meaning}).</li>`);
        } else {
            d4Items.push(`<li><strong>Câu ${k + 1}:</strong> Từ vựng "<strong>${wMain.word}</strong>" (${wMain.pos}) trong tiếng Việt có nghĩa là "<strong>${wAlt2.meaning}</strong>". [ <strong>True / False</strong> ]</li>`);
            d4Ans.push(`<li><strong>Dạng 4 - Câu ${k + 1}:</strong> <strong>False (Sai)</strong> (Vì "${wMain.word}" nghĩa là "${wMain.meaning}", không phải "${wAlt2.meaning}").</li>`);
        }

        // Dạng 5: Sắp xếp từ thành câu / Đặt câu hoàn chỉnh (10 câu)
        const wordsShuffled = wMain.exEn.replace(/\./g, '').split(' ').reverse().join(' / ') + ' / .';
        d5Items.push(`<li><strong>Câu ${k + 1}:</strong> Sắp xếp các từ sau thành câu hoàn chỉnh (có chứa từ <strong>${wMain.word}</strong>):<br><code>${wordsShuffled}</code></li>`);
        d5Ans.push(`<li><strong>Dạng 5 - Câu ${k + 1}:</strong> <em>${wMain.exEn}</em> (${wMain.exVi})</li>`);
    }

    const v0 = vocabList[0];
    const v2 = vocabList[2] || vocabList[0];
    const v9 = vocabList[9] || vocabList[0];

    const html = `
        <h2>GIÁO ÁN BẢN NHÁP TIẾNG ANH: ${topic.toUpperCase()}</h2>
        <div class="lesson-meta">
            <span><strong>📌 Mã học sinh:</strong> <code>${studentCode}</code></span>
            <span><strong>🎯 Trình độ:</strong> <code>${level}</code></span>
            <span><strong>⏱️ Thời lượng:</strong> <code>45 phút</code></span>
            <span><strong>🗣️ Giọng văn:</strong> ${toneGreeting.label}</span>
        </div>
        <p><em>💬 Câu mở đầu bài giảng của giáo viên: "${toneGreeting.opening}"</em></p>

        <h3>PHẦN 1: LÝ THUYẾT NGẮN GỌN & CÔNG THỨC TRỌNG TÂM (10 Phút)</h3>
        <p><strong>1. Mục tiêu cần nắm (Trình độ ${level}):</strong> Hiểu nghĩa, phát âm đúng và vận dụng được bộ từ vựng chủ đề <strong>${topic}</strong> vào câu giao tiếp và bài kiểm tra trên lớp.</p>
        <div class="formula-card">
            <p><strong>📐 Công thức / Cấu trúc câu ứng dụng trong bài:</strong></p>
            <ul>
                <li><strong>Cấu trúc 1 (Nêu vai trò/mục đích):</strong> <code>S + V + O + to + V-inf</code> <em>(VD: We check the quality <strong>to satisfy</strong> our customers.)</em></li>
                <li><strong>Cấu trúc 2 (Vị trí từ loại cần nhớ khi điền từ):</strong>
                    <ul>
                        <li>Sau mạo từ (<code>a / an / the</code>) hoặc tính từ sở hữu (<code>our / my / their</code>) + <strong>Danh từ (Noun)</strong>: <em>our <u>${v0.word}</u>, the <u>${v2.word}</u></em>.</li>
                        <li>Trước danh từ là <strong>Tính từ (Adj)</strong> bổ nghĩa: <em>reasonable <u>${v2.word}</u>, high <u>${v9.word}</u></em>.</li>
                    </ul>
                </li>
            </ul>
        </div>

        <h3>PHẦN 2: BỘ THẺ FLASHCARD CỐ ĐỊNH LEVEL ${level} (${vocabList.length} TỪ VỰNG: 20 - 30 TỪ) & 30 CÂU DỊCH CHÉO (20 Phút)</h3>
        <p><em>(${customText ? 'Biên soạn từ file/danh sách từ vựng giáo viên cung cấp' : `Không đính kèm file: Tự động soạn cố định <strong>${vocabList.length} thẻ từ vựng (trong mức 20 - 30 từ)</strong> thuộc duy nhất trình độ <strong>Level ${level}</strong>`})</em></p>
        <table class="lesson-table">
            <thead>
                <tr>
                    <th>Thẻ</th>
                    <th>Từ vựng (Word)</th>
                    <th>Từ loại</th>
                    <th>Nghĩa Tiếng Việt</th>
                    <th>Câu ví dụ chuẩn (${level})</th>
                </tr>
            </thead>
            <tbody>
                ${flashcardRows}
            </tbody>
        </table>

        <p><strong>🔄 Bài luyện tập dịch 30 câu chéo (Xen kẽ 15 câu Anh ➔ Việt & 15 câu Việt ➔ Anh):</strong></p>
        <ol>
            ${crossItems.join('')}
        </ol>

        <h3>PHẦN 3: 10 BÀI TẬP NHỎ KIỂM TRA ĐÚNG / SAI (5 DẠNG - MỖI DẠNG 10 CÂU)</h3>

        <p class="exercise-group-title">Dạng 1: Điền từ vào chỗ trống (Ngữ pháp & Loại từ - 10 câu)</p>
        <ol>
            ${d1Items.join('')}
        </ol>

        <p class="exercise-group-title">Dạng 2: Tìm và sửa lỗi sai trong câu (10 câu)</p>
        <ol>
            ${d2Items.join('')}
        </ol>

        <p class="exercise-group-title">Dạng 3: Trắc nghiệm khoanh A / B / C / D (10 câu)</p>
        <ol>
            ${d3Items.join('')}
        </ol>

        <p class="exercise-group-title">Dạng 4: Kiểm tra mệnh đề Đúng / Sai (True / False - 10 câu)</p>
        <ol>
            ${d4Items.join('')}
        </ol>

        <p class="exercise-group-title">Dạng 5: Sắp xếp từ thành câu hoàn chỉnh / Viết lại câu (10 câu)</p>
        <ol>
            ${d5Items.join('')}
        </ol>

        <div class="answer-key-section">
            <h4>🔑 ĐÁP ÁN NHÁP DÀNH CHO GIÁO VIÊN DUYỆT (Sẽ ẩn khi chuyển sang tab Phiếu Học Sinh)</h4>
            <p><strong>I. Đáp án 30 câu dịch chéo:</strong></p>
            <ol>
                ${crossAnswers.join('')}
            </ol>
            <p><strong>II. Đáp án Phần 3 (5 dạng x 10 câu/dạng):</strong></p>
            <ul>
                ${d1Ans.join('')}
                ${d2Ans.join('')}
                ${d3Ans.join('')}
                ${d4Ans.join('')}
                ${d5Ans.join('')}
            </ul>
        </div>
    `;

    document.getElementById('lessonEditor').innerHTML = html;
}

// ============================================================================
// 2. SOẠN GIÁO ÁN NGỮ VĂN (ÔN THI VÀO 10 & TỐT NGHIỆP THPT - 45 PHÚT)
// ============================================================================
function generateLiteratureLesson(topic, level, studentCode, customText, toneKey) {
    const levelName = level === 'VAO_10'
        ? 'Ôn thi vào lớp 10 (Lớp 9 - Bám sát cấu trúc Sở GD / Hải Phòng)'
        : 'Ôn thi Tốt nghiệp THPT (Lớp 12 - Bám sát đề minh họa Bộ GD)';

    const toneGreeting = getToneInstruction(toneKey);

    // Bộ thẻ thuật ngữ & từ vựng diễn đạt ăn điểm cho phần Flashcard Văn
    currentFlashcards = [
        { word: 'Ẩn dụ & Hoán dụ', pos: 'Biện pháp tu từ', meaning: 'Gọi tên sự vật A bằng B (ẩn dụ dựa trên nét tương đồng; hoán dụ dựa trên nét gần gũi)', exEn: 'Tác dụng: Tăng sức gợi hình, gợi cảm và làm nổi bật chiều sâu tư tưởng.' },
        { word: 'Bản lĩnh & Nội lực', pos: 'Từ khóa NLXH', meaning: 'Sức mạnh tinh thần bên trong giúp con người đứng vững trước nghịch cảnh', exEn: 'Câu mẫu: Bản lĩnh không phải là không biết sợ, mà là dám bước tiếp dù lòng đầy nỗi sợ.' },
        { word: 'Thức tỉnh nhận thức', pos: 'Cụm diễn đạt', meaning: 'Làm người đọc/con người nhận ra giá trị đúng đắn', exEn: 'Câu mẫu: Tác phẩm như một hồi chuông thức tỉnh nhận thức về lẽ sống tử tế.' },
        { word: 'Điểm tựa tinh thần', pos: 'Cụm diễn đạt', meaning: 'Nơi nâng đỡ tâm hồn con người qua giông bão', exEn: 'Câu mẫu: Tình cảm gia đình luôn là điểm tựa tinh thần vững chãi nhất.' },
        { word: 'Chiều sâu nhân đạo', pos: 'Thuật ngữ NLVH', meaning: 'Tấm lòng yêu thương, trân trọng vẻ đẹp và xót thương số phận con người của nhà văn', exEn: 'Câu mẫu: Ngòi bút tác giả thấm đẫm chiều sâu nhân đạo.' },
        { word: 'Hành trình tự vượt mình', pos: 'Cụm nâng cao', meaning: 'Nỗ lực chiến thắng sự lười biếng, giới hạn của chính bản thân', exEn: 'Câu mẫu: Trưởng thành thực chất là một hành trình tự vượt mình không ngừng nghỉ.' },
        { word: 'Giá trị cốt lõi', pos: 'Từ khóa NLXH', meaning: 'Phần phẩm chất căn bản, bền vững nhất của một con người', exEn: 'Câu mẫu: Giữa thời đại số hóa, sự chân thành vẫn là giá trị cốt lõi.' },
        { word: 'Ngôn từ cô đọng, hàm súc', pos: 'Thuật ngữ Thơ', meaning: 'Ý tại ngôn ngoại - lời ít mà gợi nhiều cảm xúc, suy ngẫm', exEn: 'Câu mẫu: Bằng ngôn từ cô đọng, hàm súc, khổ thơ đã khắc họa trọn vẹn...' },
        { word: 'Cái tôi trữ tình', pos: 'Thuật ngữ Văn học', meaning: 'Hình tượng tâm hồn, cảm xúc của chủ thể nhà thơ trong bài', exEn: 'Câu mẫu: Cái tôi trữ tình vừa thiết tha gắn bó với quê hương vừa giàu trăn trở.' },
        { word: 'Bài học nhận thức & hành động', pos: 'Kết bài NLXH', meaning: 'Rút ra suy nghĩ đúng và việc làm cụ thể cho bản thân ở phần cuối bài', exEn: 'Câu mẫu: Từ vấn đề trên, mỗi người trẻ cần tự trang bị cho mình...' }
    ];
    currentCardIndex = 0;
    renderCurrentFlashcard();

    const flashcardRows = currentFlashcards.map((c, idx) => `
        <tr>
            <td><strong>#${idx + 1}</strong></td>
            <td><strong>${c.word}</strong></td>
            <td><code>${c.pos}</code></td>
            <td>${c.meaning}</td>
            <td><em>${c.exEn}</em></td>
        </tr>
    `).join('');

    const customContextHtml = customText
        ? `<div class="formula-card"><strong>📄 Ngữ liệu / Đề bài giáo viên đính kèm:</strong><br>${customText.replace(/\n/g, '<br>')}</div>`
        : '';

    const html = `
        <h2>GIÁO ÁN BẢN NHÁP NGỮ VĂN: ${topic.toUpperCase()}</h2>
        <div class="lesson-meta">
            <span><strong>📌 Mã học sinh:</strong> <code>${studentCode}</code></span>
            <span><strong>🎯 Cấp độ:</strong> <code>${levelName}</code></span>
            <span><strong>⏱️ Thời lượng mô-đun:</strong> <code>45 phút</code> (Cày đề & Diễn đạt)</span>
            <span><strong>🗣️ Giọng văn:</strong> ${toneGreeting.label}</span>
        </div>
        <p><em>💬 Câu mở đầu bài giảng của giáo viên: "${toneGreeting.opening}"</em></p>
        ${customContextHtml}

        <h3>PHẦN 1: KIẾN THỨC NỀN & CÔNG THỨC / DÀN Ý KHUNG (10 Phút)</h3>
        <div class="formula-card">
            <p><strong>📐 Công thức trả lời chuẩn form đề minh họa Bộ GD & Sở GD (Aim 7 – 9+ điểm):</strong></p>
            <ul>
                <li><strong>Công thức 3 bước trả lời câu Biện pháp tu từ (Đọc hiểu):</strong>
                    <br><code>Bước 1: Gọi đúng tên BPTT + Chỉ rõ từ ngữ chứa BPTT</code> ➔ <code>Bước 2: Tác dụng về nghệ thuật (gợi hình, gợi cảm, nhịp điệu)</code> ➔ <code>Bước 3: Tác dụng về nội dung + Tình cảm, thông điệp của tác giả</code>.
                </li>
                <li><strong>Công thức Dàn ý 5 đoạn/ý viết Nghị luận xã hội (${topic}):</strong>
                    <ol>
                        <li><strong>Mở đoạn/bài:</strong> Dẫn dắt trực tiếp + Nêu đúng vấn đề nghị luận (<em>${topic}</em>).</li>
                        <li><strong>Giải thích ngắn gọn:</strong> Làm rõ từ khóa trọng tâm trong đề (2–3 câu).</li>
                        <li><strong>Bàn luận (Trọng tâm điểm số):</strong> Vì sao vấn đề này quan trọng? Biểu hiện và ý nghĩa đối với cá nhân & cộng đồng + 1 dẫn chứng thực tế tiêu biểu.</li>
                        <li><strong>Mở rộng / Phản đề:</strong> Phê phán biểu hiện trái ngược (thụ động, nản chí, sống hời hợt) và nêu giới hạn hợp lý của vấn đề.</li>
                        <li><strong>Bài học nhận thức & hành động:</strong> Liên hệ trực tiếp tới bản thân học sinh.</li>
                    </ol>
                </li>
            </ul>
        </div>

        <h3>PHẦN 2: BỘ THẺ TỪ VỰNG DIỄN ĐẠT ĂN ĐIỂM & 15 CÂU LUYỆN DỊCH CHÉO / CHUYỂN ĐỔI DIỄN ĐẠT (20 Phút)</h3>
        <table class="lesson-table">
            <thead>
                <tr>
                    <th>Thẻ</th>
                    <th>Cụm từ / Thuật ngữ ăn điểm</th>
                    <th>Phân loại</th>
                    <th>Ý nghĩa cốt lõi</th>
                    <th>Câu mẫu vận dụng vào bài thi</th>
                </tr>
            </thead>
            <tbody>
                ${flashcardRows}
            </tbody>
        </table>

        <p><strong>🔄 15 Câu luyện dịch chéo (Xen kẽ Nâng cấp câu văn bình thường ➔ Giàu hình ảnh & Giải mã ý nghĩa hình ảnh ➔ Thông điệp):</strong></p>
        <ol>
            <li><strong>Câu 1 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Có ý chí thì chúng ta sẽ vượt qua khó khăn."</em></li>
            <li><strong>Câu 2 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Ngọn hải đăng giữa đêm bão tố"</em> khi viết về chủ đề <strong>${topic}</strong>.</li>
            <li><strong>Câu 3 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Tác giả rất thương nhân vật trong truyện."</em></li>
            <li><strong>Câu 4 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Hạt mầm vươn lên từ lớp đất đá khô cằn"</em>.</li>
            <li><strong>Câu 5 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Mỗi học sinh cần phải cố gắng học tập tốt hơn."</em></li>
            <li><strong>Câu 6 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Chiếc la bàn định hướng giữa ngã ba đường"</em>.</li>
            <li><strong>Câu 7 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Bài thơ có rất nhiều từ ngữ hay và ý nghĩa."</em></li>
            <li><strong>Câu 8 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Dòng sông kiên trì vượt thác ghềnh để ra biển lớn"</em>.</li>
            <li><strong>Câu 9 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Nếu bỏ cuộc sớm thì sẽ không bao giờ thành công."</em></li>
            <li><strong>Câu 10 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã câu nói: <em>"Không có áp lực thì không có kim cương"</em>.</li>
            <li><strong>Câu 11 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Mỗi người đều có nét riêng, không ai giống ai."</em></li>
            <li><strong>Câu 12 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Cánh chim ngược gió giữa bầu trời giông bão"</em>.</li>
            <li><strong>Câu 13 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Tác phẩm này làm người đọc suy nghĩ rất nhiều về cuộc sống."</em></li>
            <li><strong>Câu 14 [Hình ảnh ➔ Thông điệp]:</strong> Giải mã hình ảnh: <em>"Ngọn lửa sưởi ấm đêm đông lạnh giá"</em>.</li>
            <li><strong>Câu 15 [Diễn đạt thô ➔ Giàu văn chương]:</strong> Nâng cấp câu: <em>"Tuổi trẻ cần phải sống có ích cho xã hội."</em></li>
        </ol>

        <h3>PHẦN 3: 10 BÀI TẬP NHỎ CÀY ĐỀ & KIỂM TRA ĐÚNG / SAI (5 DẠNG - MỖI DẠNG 5 CÂU)</h3>

        <p class="exercise-group-title">Dạng 1: Điền thuật ngữ văn học / từ nối chuyển ý thích hợp vào chỗ trống (5 câu)</p>
        <ol>
            <li>Bằng ngôn từ __________ và giàu sức gợi, tác giả đã khắc họa sâu sắc vẻ đẹp tâm hồn nhân vật. <em>(Gợi ý: cô đọng, hàm súc / rườm rà, liệt kê)</em></li>
            <li>Ý chí giúp con người đứng vững trước thử thách; __________, nếu thiếu đi sự kiên trì mỗi ngày thì ước mơ cũng chỉ dừng lại ở suy nghĩ. <em>(Điền từ nối chuyển ý phản biện)</em></li>
            <li>Ngòi bút của nhà văn thấm đẫm __________ khi luôn trân trọng vẻ đẹp khuất lấp của những con người nhỏ bé. <em>(Gợi ý: chiều sâu nhân đạo / cái nhìn lạnh lùng)</em></li>
            <li>Giữa kỷ nguyên số hóa, việc giữ gìn __________ giúp người trẻ không bị hòa tan thành một bản sao mờ nhạt. <em>(Gợi ý: bản sắc cá nhân / lối sống thụ động)</em></li>
            <li>Gia đình và quê hương luôn là __________ vững chãi nhất nâng đỡ tâm hồn con người qua giông bão. <em>(Gợi ý: điểm tựa tinh thần / rào cản vô hình)</em></li>
        </ol>

        <p class="exercise-group-title">Dạng 2: Phát hiện và sửa lỗi diễn đạt / dùng từ trong bài làm học sinh (5 câu)</p>
        <ol>
            <li>Câu lỗi: <em>"Qua bài học về ${topic}, làm cho em hiểu ra giá trị của sự nỗ lực."</em> ➔ <em>Chỉ ra lỗi ngữ pháp và sửa lại: ...............</em></li>
            <li>Câu lỗi: <em>"Khi trả lời câu hỏi tác dụng biện pháp tu từ, học sinh chỉ cần gọi tên biện pháp là đã đạt điểm tối đa."</em> ➔ <em>Sửa lại cho đúng quy tắc chấm thi: ...............</em></li>
            <li>Câu lỗi: <em>"Trong đoạn văn Nghị luận văn học 200 chữ, học sinh nên chia thành 3 đoạn nhỏ xuống dòng cho dễ nhìn."</em> ➔ <em>Chỉ ra lỗi hình thức và sửa lại: ...............</em></li>
            <li>Câu lỗi: <em>"Bằng biện pháp tu từ ẩn dụ 'như những vì sao', câu thơ trở nên sinh động hơn."</em> ➔ <em>Chỉ ra lỗi nhận diện BPTT và sửa lại: ...............</em></li>
            <li>Câu lỗi: <em>"Thông qua nhân vật trong đoạn trích, đã thể hiện tấm lòng yêu thương con người của nhà văn."</em> ➔ <em>Chỉ ra lỗi câu thiếu chủ ngữ và sửa lại: ...............</em></li>
        </ol>

        <p class="exercise-group-title">Dạng 3: Trắc nghiệm nhận diện cấu trúc đề & phương thức biểu đạt (5 câu)</p>
        <ol>
            <li>Khi đề bài Đọc hiểu yêu cầu: <em>"Anh/chị có đồng tình với quan điểm... không? Vì sao?"</em>, đây thuộc cấp độ câu hỏi nào trong ma trận đề thi?
                <br>A. Nhận biết &nbsp;&nbsp;&nbsp; B. Thông hiểu &nbsp;&nbsp;&nbsp; C. Vận dụng / Vận dụng cao &nbsp;&nbsp;&nbsp; D. Sao chép ngữ liệu
            </li>
            <li>Trong bài văn Nghị luận xã hội 600 chữ, phần nào chiếm nhiều điểm số và dung lượng nhất?
                <br>A. Mở bài &nbsp;&nbsp;&nbsp; B. Giải thích khái niệm &nbsp;&nbsp;&nbsp; C. Bàn luận (Phân tích lý lẽ 3 tầng bậc + Dẫn chứng) &nbsp;&nbsp;&nbsp; D. Kết bài
            </li>
            <li>Nếu các dòng thơ trong văn bản Đọc hiểu có độ dài ngắn khác nhau, không theo quy luật số chữ cố định thì đó là thể thơ gì?
                <br>A. Thơ lục bát &nbsp;&nbsp;&nbsp; B. Thơ thất ngôn bát cú &nbsp;&nbsp;&nbsp; C. Thơ tự do &nbsp;&nbsp;&nbsp; D. Thơ ngũ ngôn
            </li>
            <li>Khi người kể chuyện xưng "tôi" và trực tiếp tham gia vào cốt truyện, văn bản đó được kể theo ngôi thứ mấy?
                <br>A. Ngôi thứ nhất &nbsp;&nbsp;&nbsp; B. Ngôi thứ hai &nbsp;&nbsp;&nbsp; C. Ngôi thứ ba &nbsp;&nbsp;&nbsp; D. Không có ngôi kể
            </li>
            <li>Câu 1 phần Viết (2,0 điểm) yêu cầu viết đoạn văn 200 chữ phân tích một khía cạnh của đoạn trích Đọc hiểu thuộc kiểu bài nào?
                <br>A. Nghị luận văn học &nbsp;&nbsp;&nbsp; B. Văn bản thông tin &nbsp;&nbsp;&nbsp; C. Thuyết minh &nbsp;&nbsp;&nbsp; D. Tường thuật hành chính
            </li>
        </ol>

        <p class="exercise-group-title">Dạng 4: Kiểm tra Đúng / Sai về kỹ năng làm bài thi Văn (5 câu)</p>
        <ol>
            <li>Khi làm câu Nhận biết ở phần Đọc hiểu, học sinh được phép trích dẫn trực tiếp từ ngữ trong văn bản đề cho. [ <strong>Đúng / Sai</strong> ]</li>
            <li>Trong bài Nghị luận xã hội, lấy càng nhiều dẫn chứng kể lể dài dòng thì điểm càng cao, không cần phân tích lý lẽ. [ <strong>Đúng / Sai</strong> ]</li>
            <li>Khi viết đoạn văn Nghị luận văn học 200 chữ, tuyệt đối không được xuống dòng ở giữa đoạn. [ <strong>Đúng / Sai</strong> ]</li>
            <li>Khi phân tích tác dụng của biện pháp tu từ, bắt buộc phải nêu đủ cả tác dụng về nghệ thuật lẫn tác dụng về nội dung. [ <strong>Đúng / Sai</strong> ]</li>
            <li>Ở phần Mở rộng / Phản đề trong bài Nghị luận xã hội, học sinh nên đưa thêm góc nhìn đa chiều để ăn điểm sáng tạo. [ <strong>Đúng / Sai</strong> ]</li>
        </ol>

        <p class="exercise-group-title">Dạng 5: Thực hành viết câu chủ đề, giải thích & mở rộng phản đề (5 câu)</p>
        <ol>
            <li>Viết 01 câu Mở đoạn trực tiếp (khoảng 25–30 chữ) cho đề tài: <strong>${topic}</strong>.</li>
            <li>Viết 01 câu Giải thích ngắn gọn từ khóa trọng tâm của đề tài: <strong>${topic}</strong>.</li>
            <li>Nêu 01 dẫn chứng thực tế tiêu biểu (người thật, việc thật) phù hợp với đề tài: <strong>${topic}</strong> và viết 2 câu phân tích dẫn chứng đó.</li>
            <li>Viết 01 câu Phản đề (phê phán biểu hiện ngược lại) ngắn gọn, sắc bén cho đề tài: <strong>${topic}</strong>.</li>
            <li>Viết 01 câu Bài học nhận thức và hành động của bản thân ở phần Kết bài cho đề tài: <strong>${topic}</strong>.</li>
        </ol>

        <div class="answer-key-section">
            <h4>🔑 HƯỚNG DẪN CHẤM NHÁP DÀNH CHO GIÁO VIÊN DUYỆT (Ẩn khi xuất Phiếu Học Sinh)</h4>
            <p><strong>I. Gợi ý 15 câu luyện dịch chéo / nâng cấp diễn đạt:</strong></p>
            <ul>
                <li><strong>Câu 1:</strong> <em>Chính nội lực và ý chí kiên cường là đôi cánh nâng con người vượt lên trên những giông bão của nghịch cảnh.</em></li>
                <li><strong>Câu 2:</strong> <em>Biểu tượng cho lý tưởng sống và niềm tin soi đường giúp con người không lạc lối trước thử thách.</em></li>
                <li><strong>Câu 3:</strong> <em>Ngòi bút của nhà văn thấm đẫm chiều sâu nhân đạo và niềm cảm thương sâu sắc trước số phận nhân vật.</em></li>
                <li><strong>Câu 4:</strong> <em>Biểu tượng cho sức sống mãnh liệt, khát vọng vươn lên bất chấp hoàn cảnh khắc nghiệt.</em></li>
                <li><strong>Câu 5:</strong> <em>Mỗi người trẻ cần chủ động bước vào hành trình tự vượt mình để trau dồi tri thức và bản lĩnh.</em></li>
                <li><strong>Câu 6:</strong> <em>Biểu tượng cho bản lĩnh và giá trị cốt lõi giúp người trẻ đưa ra lựa chọn đúng đắn trước những ngã rẽ cuộc đời.</em></li>
                <li><strong>Câu 7:</strong> <em>Bằng ngôn từ cô đọng, hàm súc và giàu sức gợi hình gợi cảm, bài thơ đã ngân lên những dư âm sâu lắng.</em></li>
                <li><strong>Câu 8:</strong> <em>Biểu tượng cho hành trình kiên trì vượt qua muôn vàn chông gai để vươn tới ước mơ lớn.</em></li>
                <li><strong>Câu 9:</strong> <em>Tâm lý nản chí và dễ dàng buông xuôi chính là rào cản vô hình đánh cắp cơ hội chạm tới thành công.</em></li>
                <li><strong>Câu 10:</strong> <em>Những thử thách, áp lực khắc nghiệt chính là môi trường tôi luyện nên bản lĩnh và giá trị tỏa sáng của con người.</em></li>
                <li><strong>Câu 11:</strong> <em>Mỗi cá nhân đều mang một vân chữ tâm hồn và bản sắc riêng biệt không thể trộn lẫn.</em></li>
                <li><strong>Câu 12:</strong> <em>Biểu tượng cho tư thế hiên ngang, dũng cảm đối diện với nghịch cảnh để trưởng thành.</em></li>
                <li><strong>Câu 13:</strong> <em>Trang viết như một hồi chuông thức tỉnh nhận thức, gieo vào lòng người đọc những trăn trở sâu xa về nhân sinh.</em></li>
                <li><strong>Câu 14:</strong> <em>Biểu tượng cho tình yêu thương, sự sẻ chia và lòng nhân ái sưởi ấm những mảnh đời bất hạnh.</em></li>
                <li><strong>Câu 15:</strong> <em>Thanh xuân chỉ thực sự rực rỡ khi người trẻ biết sống dấn thân, cống hiến và kiến tạo giá trị tốt đẹp cho cộng đồng.</em></li>
            </ul>
            <p><strong>II. Đáp án Phần 3 (5 dạng x 5 câu/dạng):</strong></p>
            <ul>
                <li><strong>Dạng 1 (Điền từ - 5 câu):</strong> Câu 1: <code>cô đọng, hàm súc</code> | Câu 2: <code>tuy nhiên / thế nhưng</code> | Câu 3: <code>chiều sâu nhân đạo</code> | Câu 4: <code>bản sắc cá nhân</code> | Câu 5: <code>điểm tựa tinh thần</code>.</li>
                <li><strong>Dạng 2 (Sửa lỗi - 5 câu):</strong>
                    <ul>
                        <li>Câu 1: Bỏ từ "Qua" hoặc "làm cho" để câu có chủ ngữ (<em>"Bài học về ${topic} giúp em hiểu ra..."</em>).</li>
                        <li>Câu 2: Phải nêu đủ 3 bước (Gọi tên + chỉ từ ➔ Tác dụng nghệ thuật ➔ Tác dụng nội dung).</li>
                        <li>Câu 3: Đoạn văn 200 chữ bắt buộc viết thành 01 đoạn duy nhất, không được xuống dòng giữa đoạn.</li>
                        <li>Câu 4: Có từ "như" là biện pháp <strong>So sánh</strong>, không phải Ẩn dụ.</li>
                        <li>Câu 5: Bỏ từ "Thông qua" để "Nhân vật trong đoạn trích" làm chủ ngữ.</li>
                    </ul>
                </li>
                <li><strong>Dạng 3 (Trắc nghiệm - 5 câu):</strong> Câu 1: <strong>C</strong> | Câu 2: <strong>C</strong> | Câu 3: <strong>C</strong> | Câu 4: <strong>A</strong> | Câu 5: <strong>A</strong>.</li>
                <li><strong>Dạng 4 (Đúng/Sai - 5 câu):</strong> Câu 1: <strong>Đúng</strong> | Câu 2: <strong>Sai</strong> | Câu 3: <strong>Đúng</strong> | Câu 4: <strong>Đúng</strong> | Câu 5: <strong>Đúng</strong>.</li>
                <li><strong>Dạng 5 (Thực hành viết - 5 câu):</strong> Giáo viên chấm trực tiếp khả năng lập luận, chọn dẫn chứng và dùng từ của học sinh theo công thức Sổ tay Văn.</li>
            </ul>
        </div>
    `;

    document.getElementById('lessonEditor').innerHTML = html;
}

// ============================================================================
// GIỌNG VĂN & XƯNG HÔ CHUẨN TỪ ho_so_lop_v1.md
// ============================================================================
function getToneInstruction(toneKey) {
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

// Cập nhật hộp tin nhắn nháp đi kèm bài học
function updateChatDraft(topic, level, studentCode, toneKey) {
    const chatArea = document.getElementById('chatDraftArea');
    if (toneKey === 'chi_em_35') {
        chatArea.value = `[Bản nháp gửi ${studentCode}] Bây giờ chị sẽ đưa cho em VD về chủ đề "${topic}" (${level}) nhé. BTVN của em hôm nay gồm 10 câu dịch chéo và 10 bài tập nhỏ trong phiếu chị vừa gửi, em làm xong chụp chị chấm nha!`;
    } else if (toneKey === 'toi_anhchi') {
        chatArea.value = `[Bản nháp nghiêm khắc gửi ${studentCode}] Tôi đề nghị anh chị nghiêm túc học! Tôi đã nhắc nguyên tắc làm bài bao nhiêu lần rồi. Đây là tài liệu chuyên đề "${topic}" (${level}), anh chị hoàn thành đủ 10 câu dịch chéo và 10 bài tập đúng hạn cho tôi!`;
    } else if (toneKey === 'phu_huynh') {
        chatArea.value = `[Bản nháp gửi Phụ huynh của ${studentCode}] Dạ em/cháu gửi chị/cô tình hình buổi học hôm nay của em nhà mình ạ. Hôm nay bé học chủ đề "${topic}" (${level}) và có 10 bài tập rèn luyện. Nhờ chị/cô nhắc em hoàn thành bài trước buổi học tới nhé ạ!`;
    } else {
        chatArea.value = `[Bản nháp gửi ${studentCode}] Chị sẽ gửi tài liệu phần "${topic}" (${level}) này cho em nhé! Trong phiếu có sẵn lý thuyết ngắn gọn, thẻ từ và 10 bài tập thực hành. Không hiểu câu nào em hãy hỏi lại chị nha!`;
    }
}

// ============================================================================
// CHẾ ĐỘ XEM, LẬT THẺ FLASHCARD & DUYỆT BẢN NHÁP
// ============================================================================
function switchViewMode(mode) {
    document.getElementById('btnViewFull').classList.toggle('active', mode === 'full');
    document.getElementById('btnViewStudent').classList.toggle('active', mode === 'student');
    document.getElementById('btnViewCard').classList.toggle('active', mode === 'flashcard');

    const editor = document.getElementById('lessonEditor');
    const cardArea = document.getElementById('interactiveFlashcardArea');

    if (mode === 'student') {
        editor.classList.add('hide-answers');
        cardArea.classList.add('hidden');
    } else if (mode === 'flashcard') {
        editor.classList.remove('hide-answers');
        cardArea.classList.remove('hidden');
        renderCurrentFlashcard();
    } else {
        editor.classList.remove('hide-answers');
        cardArea.classList.add('hidden');
    }
}

function renderCurrentFlashcard() {
    if (!currentFlashcards.length) return;
    const card = currentFlashcards[currentCardIndex];
    document.getElementById('cardCounter').textContent = `Thẻ ${currentCardIndex + 1} / ${currentFlashcards.length}`;
    document.getElementById('cardWord').textContent = card.word;
    document.getElementById('cardPos').textContent = `(${card.pos})`;
    document.getElementById('cardMeaning').textContent = card.meaning;
    document.getElementById('cardExample').textContent = card.exEn;

    document.getElementById('cardFront').classList.remove('hidden');
    document.getElementById('cardBack').classList.add('hidden');
}

function flipCurrentCard() {
    document.getElementById('cardFront').classList.toggle('hidden');
    document.getElementById('cardBack').classList.toggle('hidden');
}

function nextCard() {
    if (!currentFlashcards.length) return;
    currentCardIndex = (currentCardIndex + 1) % currentFlashcards.length;
    renderCurrentFlashcard();
}

function prevCard() {
    if (!currentFlashcards.length) return;
    currentCardIndex = (currentCardIndex - 1 + currentFlashcards.length) % currentFlashcards.length;
    renderCurrentFlashcard();
}

// Giáo viên bấm Duyệt bản nháp
function approveLesson() {
    isApproved = true;
    const badge = document.getElementById('approvalBadge');
    badge.textContent = '✅ ĐÃ ĐƯỢC GIÁO VIÊN DUYỆT (Sẵn sàng gửi)';
    badge.classList.add('approved');
    showToast('Đã xác nhận duyệt bản nháp! Bạn có thể Sao chép hoặc Tải về để gửi học sinh.');
}

function copyApprovedContent() {
    const text = document.getElementById('lessonEditor').innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast(isApproved ? 'Đã sao chép giáo án đã duyệt!' : 'Đã sao chép bản nháp! (Hãy nhớ kiểm tra trước khi bấm gửi học sinh)');
    });
}

function copyChatMessage() {
    const msg = document.getElementById('chatDraftArea').value;
    navigator.clipboard.writeText(msg).then(() => {
        showToast('Đã sao chép tin nhắn nháp! Bạn là người bấm gửi cuối cùng.');
    });
}

function downloadMarkdown() {
    const studentCode = document.getElementById('studentCode').value.trim() || 'HS26';
    const topic = document.getElementById('topicInput').value.trim() || 'bai-giang';
    const statusText = isApproved ? 'DA-DUYET' : 'BAN-NHAP';
    const content = `# TRẠNG THÁI: ${statusText}\n\n` + document.getElementById('lessonEditor').innerText + `\n\n---\n### TIN NHẮN SOẠN NHÁP KÈM THEO:\n` + document.getElementById('chatDraftArea').value;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = topic.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
    a.href = url;
    a.download = `giao-an-45p-${studentCode}-${safeName || 'bai-hoc'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Đã tải file giáo án (.md) về máy!');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3200);
}
