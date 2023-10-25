** POSYAYEE **
- POS = Point of sale 
- YAYEE = Name
- เป็นระบบจัดการหน้าร้านที่สามารถสแกน barcode เพื่อขายของ 
- จุดประสงค์หลักคือการเช็คว่าสินค้าชนิดไหนใกล้จะหมดเพราะจะทำให้สามารถหามาเพิ่มได้อบ่างทันท่วงทีทำให้ไม่เสียลูกค้า
- โปรเจคฝึกหัดการเว็บทำแอปพลิเคชันเลยทำออกมาในรูปแบบเว็บเพราะสามารถทำให้สวยงามได้ และสามารถเก็บเป็นผลงานได้
  
** Tech stack **

- Design: Figma
- Front-end: React.js + Tailwind.css
- Back-end: Node.js + Express
- Database: MongoDB


** First commit **
- สร้างหน้าหลัก Route ของ Aside (Left nav bar)
- เชื่อม API สินค้าไม่มีบาร์โค้ดมาแสดงหน้าหลัก 

![สกรีนช็อต 2023-09-30 165341](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/5e7eae68-6e28-4233-8e76-49205b78c613)

** Second commit **
- ทำหน้าสต็อก 
- เพิ่มปุ่มค้นหา
- เชื่อม API สินค้าที่ใกล้จะหมด พร้อมทำ UI 
- เชื่อม API สินค้าที่ทั้งหมด พร้อมทำ UI 
- เพิ่มปุ่มลบและแก้ไขที่ยังกดไม่ได้ 
- ทำหน้าโหลดดิ้ง
- แก้ไขปุ่มตรง aside ที่ต้องดับเบิ้ลคลิ๊กถึงจะ active
  
![image-3](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/587a7afd-84f0-4c68-ba77-a906d965c478)
![image-2](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/9d1c002b-5b08-4e61-9265-2383dfda35d9)
![image-1](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/54d15bb5-66f3-4db9-89e5-e25066a613dc)


** Third commit **
- ทำหน้า scan
- ทำฟังก์ชันลบข้อมูลจาก scan
- เพิ่มปุ่มแจ้งเตือนเวลาลบข้อมูลด้วย toatify
- เพิ่มปุ่มยกเลิกการขาย (ยังไม่ได้สร้าง pop-up confiirm)

  
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/caa5b99d-8d2a-4a01-b281-8c93c1c9cf2a)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/c47e9ebe-dc96-4026-b77b-97113e7ddd0f)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/6797ed15-7030-4e5b-be0a-3b391972b007)

** Fourth commit **
- เพิ่ม Popup confirm
  
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/d0aa4f5c-3519-4314-857d-02b3668355e4)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/52662abb-b704-4d5c-ada6-f7005081ff8d)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/0e8f4345-2e3b-4af3-bdaf-5f595a1a005a)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/1935606b-ac49-42a9-bd7c-2b1afb0d94b5)


![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/ae1340ac-7188-4549-959e-6c189022d673)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/81c07f21-9500-4f99-ad0f-38e02c2856f7)


** Fifth commit **

- เพิ่ม Modal การแก้ไขข้อมูลของ AllProduct , OutStockProduct
- เพิ่ม Modal คอนเฟิร์มการลบข้อมูลของ AllProduct , OutStockProduct

![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/d64f57f9-2f96-4c37-98d0-c1cbe3639272)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/32f422eb-5b3d-4cdb-9602-17c7f49029c4)

 ** Sixth commit **

 - ทำพรีวิวรูปตรง edit products
 - ทำหน้า Login
 - เปลี่ยน design หน้า sale

![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/7dadf622-8c64-47b7-ac4f-ee89e8f03263)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/9baaa2fa-7979-4892-bee4-d83d8ecf6bd0)
![image](https://github.com/boytur/POS-MERN-CLIENT-SIDE/assets/104257779/7355794c-7436-4f9d-b4f1-4d0129a24617)

** Seventh commit **

- ทำเสิร์ชสินค้าและเพิ่มสินค้าเข้าตะกร้า

![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/2c8ca424-8bf3-4f22-b219-304af7487b59)

** Eighth commit **

- เชื่อม API delete
- ทำป๊อบอัพเมื่อลบสินค้าเสร็จ
- ทำแค่ใน All products ส่วน OutStcok ยังไม่ทำ

![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/5444a636-3891-4842-abc0-bf683458c56a)
![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/c3a41dba-77ea-4af5-ae5d-ec23718e4e3a)

** Ninth commit **

- ทำหน้าเพิ่มสินค้า
- เพิ่มฟอร์มสำหรับเพิ่มสินค้าใหม่
- แก้ไขดีไซน์ EditProduct.jsx

![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/cc3eba02-0180-4a89-8768-1a4c09856ded)
![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/1f9dd1f9-9a54-4a4d-9895-a448250eff87)

** Tenth commit **
- เชื่อม API login
- เก็บ token ใน session storage และ username
- เอาชื่อไปแสดงมุมขวาบน

![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/9215dabb-ab69-45e9-89ba-522bf774de08)
![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/ae79991d-e4fe-4c63-bba9-17979e335784)
![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/2fd9564c-6f74-4969-8f1c-a02df3baddb7)
![image](https://github.com/boytur/POS-YAYEE-CLIENT/assets/104257779/34acaa89-046a-4f2f-b32b-a64a471330c9)


