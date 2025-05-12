export default function TrendingCompany() {
return (
    <section className="bg-white py-16">
    <div className="max-w-6xl mx-auto">
     <h2 className="text-3xl font-bold text-center mb-10">Công ty hàng đầu</h2>
 
     <div className="flex flex-nowrap gap-6 overflow-x-auto mb-8 px-2">
       {[
         {
           logo: 'https://fpt-telecom.vn/assets/images/logo.png',
           name: 'FPT Telecom',
           address: '66 D. Hoàng Diệu 2, Khu Pho 3, Thủ Đức',
           website: 'https://fpt-telecom.vn/',
         },
         {
           logo: 'https://www.vietinbank.vn/sites/all/themes/vtb/images/logo.png',
           name: 'Ngân Hàng TMCP Công Thương Việt Nam',
           address: '108 Trần Hưng Đạo, Cửa Nam, Quận Hoàn Kiếm',
           website: 'https://www.vietinbank.vn/',
         },
         {
           logo: 'https://afotech.vn/wp-content/uploads/2021/07/logo-afotech.png',
           name: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ AFOTECH',
           address: 'số 08, đường TS15, KCN Tiên Sơn, Bắc Ninh',
           website: 'https://afotech.vn',
         },
         {
           logo: 'https://kimtingroup.com/wp-content/uploads/2021/07/logo.png',
           name: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN KIM TÍN',
           address: '69 Nguyễn Thị, Phường 13, Quận 5',
           website: 'http://www.kimtingroup.com/',
         },
       ].map((company, idx) => (
         <div
           key={idx}
           className="min-w-[260px] bg-white rounded-xl shadow-md p-6 flex-shrink-0 flex flex-col items-center text-center border border-gray-100"
         >
           <img
             src={company.logo}
             alt={company.name}
             className="w-16 h-16 object-contain rounded-full mb-3 border"
           />
           <div
             className="font-semibold text-lg mb-1 w-full truncate"
             title={company.name}
           >
             {company.name}
           </div>
           <div
             className="text-gray-500 text-sm flex items-center justify-center mb-1 w-full truncate"
             title={company.address}
           >
             <span className="mr-1">📍</span>
             {company.address}
           </div>
           <div
             className="text-gray-500 text-sm flex items-center justify-center w-full truncate"
             title={company.website}
           >
             <span className="mr-1">🌐</span>
             <a
               href={company.website}
               target="_blank"
               rel="noopener noreferrer"
               className="hover:underline text-blue-600 truncate"
             >
               {company.website}
             </a>
           </div>
         </div>
       ))}
     </div>
 
     <div className="flex justify-center">
       <button className="px-8 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-700 text-white font-semibold shadow-md hover:opacity-90 transition">
         Xem thêm
       </button>
     </div>
   </div>
 </section>
 
)

}
