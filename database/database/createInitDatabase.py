from pymongo import MongoClient

client = MongoClient("localhost", 27017)

db = client["web_nhom_24"]

# Tạo collection users
users = db["users"]

# Tạo 2 user
user1 = {
  "name": "User 1",
  "username": "user1",
  "password": "123456",
  "token": "",
  "created_at": "2023-11-14T08:00:00Z",
  "folders": [],
  "courses": [],
}

user2 = {
  "name": "User 2",
  "username": "user2",
  "password": "123456",
  "token": "",
  "created_at": "2023-11-14T08:00:00Z",
  "folders": [],
  "courses": [],
}

users.insert_many([user1, user2])

# Tạo collection folders
folders = db["folders"]

# Tạo 2 folder cho mỗi user
folder1 = {
  "name": "Folder 1",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 2,
  "courses": [],
}

folder2 = {
  "name": "Folder 2",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 2,
  "courses": [],
}

folder3 = {
  "name": "Folder 3",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 2,
  "courses": [],
}

folder4 = {
  "name": "Folder 4",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 2,
  "courses": [],
}

folders.insert_many([folder1, folder2, folder3, folder4])

# Cập nhật folders cho user
users.update_one({"username": "user1"}, {"$push": {"folders": [folder1["_id"], folder2["_id"]]}})
users.update_one({"username": "user2"}, {"$push": {"folders": [folder3["_id"], folder4["_id"]]}})

# Tạo collection courses
courses = db["courses"]

# Tạo 2 course cho mỗi folder
course1 = {
  "name": "Course 1",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course2 = {
  "name": "Course 2",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course3 = {
  "name": "Course 3",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course4 = {
  "name": "Course 4",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course5 = {
  "name": "Course 5",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course6 = {
  "name": "Course 6",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course7 = {
  "name": "Course 7",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

course8 = {
  "name": "Course 8",
  "created_at": "2023-11-14T08:00:00Z",
  "total": 3,
  "arr_key_value": [],
}

courses.insert_many([course1, course2, course3, course4, course5, course6, course7, course8])

# Cập nhật courses cho folder
folders.update_one({"name": "Folder 1"}, {"$push": {"courses": [course1["_id"], course2["_id"]]}})
folders.update_one({"name": "Folder 2"}, {"$push": {"courses": [course3["_id"], course4["_id"]]}})
users.update_one({"name": "User 1"}, {"$push": {"courses": [course1["_id"], course2["_id"], course3["_id"], course4["_id"]]}})
folders.update_one({"name": "Folder 3"}, {"$push": {"courses": [course5["_id"], course6["_id"]]}})
folders.update_one({"name": "Folder 4"}, {"$push": {"courses": [course7["_id"], course8["_id"]]}})
users.update_one({"name": "User 2"}, {"$push": {"courses": [course5["_id"], course6["_id"], course7["_id"], course8["_id"]]}})

# Tạo collection keyValue
key_values = db["key_values"]

kv1 = {
  "key": "hello",
  "value": "xin chào",
  "image": "https://example.com/image.png",
}
kv2 = {
  "key": "world",
  "value": "thế giới",
  "image": "https://example.com/image.png",
}
kv3 = {
  "key": "goodbye",
  "value": "tạm biệt",
  "image": "https://example.com/image.png",
}
kv4 = {
  "key": "cut",
  "value": "cắt",
  "image": "https://example.com/image.png",
}
kv5 = {
  "key": "buy",
  "value": "mua",
  "image": "https://example.com/image.png",
}
kv6 = {
  "key": "money",
  "value": "tiền",
  "image": "https://example.com/image.png",
}
kv7 = {
  "key": "API",
  "value": "Application Programming Interface",
  "image": "https://example.com/image.png",
}
kv8 = {
  "key": "DOM",
  "value": "Document Object Model",
  "image": "https://example.com/image.png",
}
kv9 = {
  "key": "MVC",
  "value": "Model View Controller",
  "image": "https://example.com/image.png",
}
kv10 = {
  "key": "light",
  "value": "ánh sáng",
  "image": "https://example.com/image.png",
}
kv11 = {
  "key": "turn on",
  "value": "bật",
  "image": "https://example.com/image.png",
}
kv12 = {
  "key": "turn off",
  "value": "tắt",
  "image": "https://example.com/image.png",
}
kv13 = {
  "key": "right",
  "value": "bên phải",
  "image": "https://example.com/image.png",
}
kv14 = {
  "key": "left",
  "value": "bên trái",
  "image": "https://example.com/image.png",
}
kv15 = {
  "key": "top",
  "value": "trên",
  "image": "https://example.com/image.png",
}
kv16 = {
  "key": "Kaido",
  "value": "Bại tướng của Luffy",
  "image": "https://example.com/image.png",
}
kv17 = {
  "key": "Nika",
  "value": "Thần mặt trời",
  "image": "https://example.com/image.png",
}
kv18 = {
  "key": "Hokage",
  "value": "Vua hải tặc",
  "image": "https://example.com/image.png",
}
kv19 = {
  "key": "Kurama",
  "value": "Cửu vỹ hồ",
  "image": "https://example.com/image.png",
}
kv20 = {
  "key": "papasuke",
  "value": "Sasuke trong boruto",
  "image": "https://example.com/image.png",
}
kv21 = {
  "key": "Itachi",
  "value": "anh trai quốc dân",
  "image": "https://example.com/image.png",
}
kv22 = {
  "key": "Băng hải tặc Bigmom",
  "value": "Rạp xiếc trung ương Bigmom",
  "image": "https://example.com/image.png",
}
kv23 = {
  "key": "Pain",
  "value": "Akatsuki Leader",
  "image": "https://example.com/image.png",
}
kv24 = {
  "key": "Cách chiến thắng boss",
  "value": "sức mạnh tình bạn, hồi tưởng quá khứ",
  "image": "https://example.com/image.png",
}

key_values.insert_many([kv1, kv2, kv3, kv4, kv5, kv6, kv7, kv8, kv9, kv10, kv11, kv12,
                        kv13, kv14, kv15, kv16, kv17, kv18, kv19, kv20, kv21, kv22, kv23, kv24])

# Cập nhật arr_key_value cho course
courses.update_one({"name": "Course 1"}, {"$push": {"arr_key_value": [kv1["_id"], kv2["_id"], kv3["_id"]]}})
courses.update_one({"name": "Course 2"}, {"$push": {"arr_key_value": [kv4["_id"], kv5["_id"], kv6["_id"]]}})
courses.update_one({"name": "Course 3"}, {"$push": {"arr_key_value": [kv7["_id"], kv8["_id"], kv9["_id"]]}})
courses.update_one({"name": "Course 4"}, {"$push": {"arr_key_value": [kv10["_id"], kv11["_id"], kv12["_id"]]}})
courses.update_one({"name": "Course 5"}, {"$push": {"arr_key_value": [kv13["_id"], kv14["_id"], kv15["_id"]]}})
courses.update_one({"name": "Course 6"}, {"$push": {"arr_key_value": [kv16["_id"], kv17["_id"], kv18["_id"]]}})
courses.update_one({"name": "Course 7"}, {"$push": {"arr_key_value": [kv19["_id"], kv20["_id"], kv21["_id"]]}})
courses.update_one({"name": "Course 8"}, {"$push": {"arr_key_value": [kv22["_id"], kv23["_id"], kv24["_id"]]}})


# In thông tin database
print(db.list_collection_names())

# Đóng kết nối
client.close()

