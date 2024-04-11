from pymongo import MongoClient

client = MongoClient("localhost", 27017)

db = client["web_nhom_24"]

# Tạo collection users
users = db["users"]

# Tạo 2 user
user1 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "username": "User 1",
  "email": "user1@gmail.com",
  "password": "123456",
  "token": "",
  "folders": [],
  "courses": [],
}

user2 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "username": "User 2",
  "email": "user2@gmail.com",
  "password": "123456",
  "token": "",
  "folders": [],
  "courses": [],
}

users.insert_many([user1, user2])

# Tạo collection folders
folders = db["folders"]

# Tạo 2 folder cho mỗi user
folder1 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Folder 1",
  "description": "Folder 1 description",
  "courses": [],
}

folder2 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Folder 2",
  "description": "Folder 2 description",
  "courses": [],
}

folder3 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Folder 3",
  "description": "Folder 3 description",
  "courses": [],
}

folder4 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Folder 4",
  "description": "Folder 4 description",
  "courses": [],
}

folders.insert_many([folder1, folder2, folder3, folder4])

# Cập nhật folders cho user
users.update_one({"email": "user1@gmail.com"}, {"$push": {"folders": [folder1["_id"], folder2["_id"]]}})
users.update_one({"email": "user2@gmail.com"}, {"$push": {"folders": [folder3["_id"], folder4["_id"]]}})

# Tạo collection courses
courses = db["courses"]

# Tạo 2 course cho mỗi folder
course1 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 1",
  "description": "Course 1 description",
  "arr_key_value": [],
}

course2 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 2",
  "description": "Course 2 description",
  "arr_key_value": [],
}

course3 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 3",
  "description": "Course 3 description",
  "arr_key_value": [],
}

course4 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 4",
  "description": "Course 4 description",
  "arr_key_value": [],
}

course5 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 5",
  "description": "Course 5 description",
  "arr_key_value": [],
}

course6 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 6",
  "description": "Course 6 description",
  "arr_key_value": [],
}

course7 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 7",
  "description": "Course 7 description",
  "arr_key_value": [],
}

course8 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "title": "Course 8",
  "description": "Course 8 description",
  "arr_key_value": [],
}

courses.insert_many([course1, course2, course3, course4, course5, course6, course7, course8])

# Cập nhật courses cho folder
folders.update_one({"title": "Folder 1"}, {"$push": {"courses": [course1["_id"], course2["_id"]]}})
folders.update_one({"title": "Folder 2"}, {"$push": {"courses": [course3["_id"], course4["_id"]]}})
users.update_one({"title": "User 1"}, {"$push": {"courses": [course1["_id"], course2["_id"], course3["_id"], course4["_id"]]}})
folders.update_one({"title": "Folder 3"}, {"$push": {"courses": [course5["_id"], course6["_id"]]}})
folders.update_one({"title": "Folder 4"}, {"$push": {"courses": [course7["_id"], course8["_id"]]}})
users.update_one({"title": "User 2"}, {"$push": {"courses": [course5["_id"], course6["_id"], course7["_id"], course8["_id"]]}})

# Tạo collection keyValue
key_values = db["key_values"]

kv1 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "hello",
  "value": "xin chào",
  "image": "https://example.com/image.png",
}
kv2 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "world",
  "value": "thế giới",
  "image": "https://example.com/image.png",
}
kv3 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "goodbye",
  "value": "tạm biệt",
  "image": "https://example.com/image.png",
}
kv4 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "cut",
  "value": "cắt",
  "image": "https://example.com/image.png",
}
kv5 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "buy",
  "value": "mua",
  "image": "https://example.com/image.png",
}
kv6 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "money",
  "value": "tiền",
  "image": "https://example.com/image.png",
}
kv7 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "API",
  "value": "Application Programming Interface",
  "image": "https://example.com/image.png",
}
kv8 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "DOM",
  "value": "Document Object Model",
  "image": "https://example.com/image.png",
}
kv9 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "MVC",
  "value": "Model View Controller",
  "image": "https://example.com/image.png",
}
kv10 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "light",
  "value": "ánh sáng",
  "image": "https://example.com/image.png",
}
kv11 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "turn on",
  "value": "bật",
  "image": "https://example.com/image.png",
}
kv12 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "turn off",
  "value": "tắt",
  "image": "https://example.com/image.png",
}
kv13 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "right",
  "value": "bên phải",
  "image": "https://example.com/image.png",
}
kv14 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "left",
  "value": "bên trái",
  "image": "https://example.com/image.png",
}
kv15 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "top",
  "value": "trên",
  "image": "https://example.com/image.png",
}
kv16 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Kaido",
  "value": "Bại tướng của Luffy",
  "image": "https://example.com/image.png",
}
kv17 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Nika",
  "value": "Thần mặt trời",
  "image": "https://example.com/image.png",
}
kv18 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Hokage",
  "value": "Vua hải tặc",
  "image": "https://example.com/image.png",
}
kv19 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Kurama",
  "value": "Cửu vỹ hồ",
  "image": "https://example.com/image.png",
}
kv20 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "papasuke",
  "value": "Sasuke trong boruto",
  "image": "https://example.com/image.png",
}
kv21 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Itachi",
  "value": "anh trai quốc dân",
  "image": "https://example.com/image.png",
}
kv22 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Băng hải tặc Bigmom",
  "value": "Rạp xiếc trung ương Bigmom",
  "image": "https://example.com/image.png",
}
kv23 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Pain",
  "value": "Akatsuki Leader",
  "image": "https://example.com/image.png",
}
kv24 = {
  "createdAt": "2023-11-14T08:00:00Z",
  "key": "Cách chiến thắng boss",
  "value": "sức mạnh tình bạn, hồi tưởng quá khứ",
  "image": "https://example.com/image.png",
}

key_values.insert_many([kv1, kv2, kv3, kv4, kv5, kv6, kv7, kv8, kv9, kv10, kv11, kv12,
                        kv13, kv14, kv15, kv16, kv17, kv18, kv19, kv20, kv21, kv22, kv23, kv24])

# Cập nhật arr_key_value cho course
courses.update_one({"title": "Course 1"}, {"$push": {"arr_key_value": [kv1["_id"], kv2["_id"], kv3["_id"]]}})
courses.update_one({"title": "Course 2"}, {"$push": {"arr_key_value": [kv4["_id"], kv5["_id"], kv6["_id"]]}})
courses.update_one({"title": "Course 3"}, {"$push": {"arr_key_value": [kv7["_id"], kv8["_id"], kv9["_id"]]}})
courses.update_one({"title": "Course 4"}, {"$push": {"arr_key_value": [kv10["_id"], kv11["_id"], kv12["_id"]]}})
courses.update_one({"title": "Course 5"}, {"$push": {"arr_key_value": [kv13["_id"], kv14["_id"], kv15["_id"]]}})
courses.update_one({"title": "Course 6"}, {"$push": {"arr_key_value": [kv16["_id"], kv17["_id"], kv18["_id"]]}})
courses.update_one({"title": "Course 7"}, {"$push": {"arr_key_value": [kv19["_id"], kv20["_id"], kv21["_id"]]}})
courses.update_one({"title": "Course 8"}, {"$push": {"arr_key_value": [kv22["_id"], kv23["_id"], kv24["_id"]]}})


# In thông tin database
print(db.list_collection_names())

# Đóng kết nối
client.close()

