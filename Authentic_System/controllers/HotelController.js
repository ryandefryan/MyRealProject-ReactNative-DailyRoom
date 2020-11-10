const db = require('./../database/MySQL.js');
const dbAsync = require('./../database/MySQLAsync.js');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllHotels : (req, res) => {
        console.log(req.params.cityName)
        console.log(req.params.startDate)
        console.log(req.params.endDate)

        db.query(`SELECT h.id, h.name, min(r.price) AS price, address, h.city, phone, star, hi.url FROM hotels h
                  JOIN rooms r ON h.id = r.hotel_id
                  JOIN hotel_images hi ON hi.hotel_id = h.id
                  WHERE h.city = ? AND h.id IN(
                  SELECT hotel_id FROM rooms WHERE id IN(
                  SELECT get_room_available(?, ?, id, total_room) FROM rooms))
                  GROUP BY h.name;`, [String(req.params.cityName), String(req.params.startDate), String(req.params.endDate)], (err, result) => {
            try {
                if(err) throw err
                res.send({
                    error: false,
                    message : 'Fetch Data Success',
                    data : result
                })
            } catch (error) {
                res.send({
                    error: true,
                    message : error.message
                })
            }
        })
        
    },



    getDetailHotel : async (req, res) => {
        console.log(req.params.idHotel)
        console.log(req.params.startDate)
        console.log(req.params.endDate)

        let queryGetHotel = `SELECT * FROM hotels WHERE id = ?;`
        let queryGetHotelImages = `SELECT * FROM hotel_images WHERE hotel_id = ?;`
        let queryGetRooms = `SELECT r.id, r.name, price, total_room, hotel_id, GROUP_CONCAT(DISTINCT(ri.url)) AS room_image_url, get_count_room_available(?, ?, r.id, total_room) as room_left FROM rooms r 
                             JOIN dailyroom.room_images ri ON r.id = ri.room_id 
                             WHERE hotel_id = ? 
                             GROUP BY room_id;`
        let queryGetRoomImages = `SELECT ri.url AS url FROM dailyroom.rooms r 
                                  JOIN dailyroom.room_images ri ON r.id = ri.room_id 
                                  WHERE hotel_id = ?;`
        let queryGetHotelFacilities = `SELECT facility_id, name, icon FROM hotel_has_facilities h 
                                       JOIN facilities f ON h.facility_id = f.id WHERE h.hotel_id = ?;`

        try {
            let dataHotel = await dbAsync(queryGetHotel, req.params.idHotel)
            let dataHotelImages = await dbAsync(queryGetHotelImages, req.params.idHotel)
            let dataRooms = await dbAsync(queryGetRooms, [req.params.startDate, req.params.endDate, req.params.idHotel])
            let dataRoomImages = await dbAsync(queryGetRoomImages, req.params.idHotel)
            let dataHotelFacilities = await dbAsync(queryGetHotelFacilities, req.params.idHotel)

            let detailImages = []

            dataHotelImages.forEach((value, index) => {
                detailImages.push(
                    {   
                        url: '/supports/images/public/Hotel_Images/' + value.url
                    }
                )
            })

            dataRoomImages.forEach((value, index) => {
                detailImages.push(
                    {
                        url: '/supports/images/public/Room_Images/' + value.url
                    }
                )
            })

            res.send({
                error: false,
                message: 'Fetch Data Success',
                hotel: dataHotel,
                rooms: dataRooms,
                facilites: dataHotelFacilities,
                detailImages
            })
        } catch (error) {
            console.log(error)
        }

        // db.query(`SELECT h.id, h.name, r.id as room_id, r.name as room_name, r.price AS price, h.address, h.city, h.phone, h.star, hi.id AS hotel_image_id, hi.url AS hotel_image_url, ri.id AS room_image_id, ri.url as room_image_url, hhf.facility_id as facilities_id, f.icon as facilities_image_url FROM dailyroom.hotels h
        //           JOIN dailyroom.hotel_images hi ON hi.hotel_id = h.id
        //           JOIN dailyroom.rooms r ON h.id = r.hotel_id
        //           JOIN dailyroom.room_images ri ON r.id = ri.room_id
        //           JOIN dailyroom.hotel_has_facilities hhf ON h.id = hhf.hotel_id
        //           JOIN dailyroom.facilities f ON hhf.facility_id = f.id WHERE h.id = ?;`, req.params.idHotel, (err, result) => {
        //     try {
        //         if(err) throw err

        //         let dataTransformed = []

        //         result.forEach((value) => {
        //             let idHotelExist = null

        //             dataTransformed.forEach((find, index) => {
        //                 if(find.id === value.id){
        //                     idHotelExist = index
        //                 }
        //             })
        //             console.log(idHotelExist)

        //             if(idHotelExist !== null){
        //                 let indexRooms = dataTransformed[idHotelExist].room.findIndex(x => x.name === value.room_name)
        //                 if(indexRooms === -1){
        //                     dataTransformed[idHotelExist].room.push(
        //                         { 
        //                             id: value.room_id, 
        //                             name: value.room_name,
        //                             price: value.price,
        //                             roomImagesURL: [
        //                                 {
        //                                     id: value.room_image_id,
        //                                     url: value.room_image_url
        //                                 }
        //                             ] 
        //                         }
        //                     )
        //                 }

        //                 let indexFacilities = dataTransformed[idHotelExist].hotelFacilitiesImagesURL.findIndex(x => x.url === value.facilities_image_url)
        //                 if(indexFacilities === -1){
        //                     dataTransformed[idHotelExist].hotelFacilitiesImagesURL.push(
        //                         { 
        //                             url: value.facilities_image_url
        //                         }
        //                     )
        //                 }
        //             }else{
        //                 dataTransformed.push({
        //                     id: value.id,
        //                     name: value.name,
        //                     address: value.address,
        //                     city: value.city,
        //                     phone: value.phone,
        //                     star: value.star,
        //                     hotelImagesURL: value.hotel_image_url,
        //                     room: [
        //                         { id: value.room_id, 
        //                           name: value.room_name,
        //                           price: value.price,
        //                           roomImagesURL: [
        //                               {
        //                                   id: value.room_image_id,
        //                                   url: value.room_image_url
        //                               }
        //                           ]
        //                         }
        //                     ],
        //                     hotelFacilitiesImagesURL: [
        //                         {
        //                             url: value.facilities_image_url
        //                         }
        //                     ]
        //                 })
        //             }
        //         })

        //         res.json({
        //             error : false,
        //             data : dataTransformed
        //         })
        //     } catch (error) {
        //         res.send({
        //             error: true,
        //             message : error.message
        //         })
        //     }
        // })
    }
}