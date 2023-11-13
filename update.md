# อัพเดต 1.0.1
- UX/UI
  - เนื่องจากหน้า Sale.jsx ผู้ใช้สามารถที่จะครอปตัวหนังสือโดยไม่ได้ตั้งใจซึ่งทำให้สินค้าที่ไม่ได้ตั้งใจจะขายติดตะกร้าหรือเพิ่มจำนวนไปด้วย จึงมีการปรับปรุงในส่วนของ css เพื่อไม่ให้ผู้ใช้สามารถทำการดังกล่าวได้

#### ไฟล์ที่มีการแก้ไขได้แก่ 
- src\components\MainComponents\SaleProductCom\Sale.jsx

# อัพเดต 1.0.2
- BUG
   - แก้ไขบัคตอนที่กดยกเลิกการจ่ายเงินแล้วระบบยังส่งว่าจ่าย (หน้าป้อนเงินสดและระบบจะแสดงเงินทอน src\components\PopupComponents\ConfirmPayOrder.jsx) 

#### ไฟล์ที่มีการแก้ไขได้แก่ 
- src\components\PopupComponents\ConfirmPayOrder.jsx

# อัพเดต 1.0.3
- UX/UI
 - แก้ไข placeholder หน้า EditProduct.jsx ให้เป็นข้อมูลของสินค้าที่จะแก้ไข
 - ทำการเพิ่ม checkbox การใช้รูปภาพเดิมจะได้สะดวกต่อการแก้ไขสินค้า

#### ไฟล์ที่มีการแก้ไขได้แก่ 
- src\components\PopupComponents\EditProduct.jsx

![image](/image.update/update1.0.3#1.png)