import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
//Get usre's addresses
//GET/api/addresses
export const getAddresses = async (req: Request, res:Response) => {
    const addresses = await prisma.address.findMany({
        where : {userId : req.user!.id},
        orderBy: {createdAt : 'asc'}
    })
    res.json({addresses})
};

//Add address
//POST/api/addresses
export const addAddress = async (req: Request, res:Response) => {
  const {label, state, address, city, zip,isDefault, lng, lat } = req.body;
  //require coordinates
  if(lat == null || lng == null){
    return res.status(400).json({message:'Location coordinate are required. Please allow location access'})
  }

  const currentAddresses = await prisma.address.findMany({
        where : {userId : req.user!.id}
    });
    let makeDefault = isDefault;
    if(currentAddresses.length === 0) {
        //ie there's no current address, default address become the address
        makeDefault = true;
    };
    if(makeDefault){
        await prisma.address.updateMany({
            where : {userId : req.user!.id},
            data : {isDefault : false}
        })
    };
    //add new address in database
    await prisma.address.create({
        data : {userId : req.user!.id, 
            label,
             city,
              state,
               zip, 
              lat : Number(lat), 
              lng : Number(lng),
               isDefault: makeDefault}
    });

    const addresses = await prisma.address.findMany({
        where : {userId : req.user!.id},
        orderBy: {createdAt: 'asc'}
    })
    res.status(201).json({ addAddress})

};

//update address
//put/api/addresses/:id
export const updateAddress = async (req: Request, res:Response) => {
  const {label, state, address, city, zip,isDefault, lng, lat } = req.body;

  if(lat == null || lng == null){
    return res.status(400).json({message:'Location coordinate are required. Please allow location access'})
  }

  if(isDefault){
        await prisma.address.updateMany({
            where : {userId : req.user!.id},
            data : {isDefault : false}
        })
    };

    const data: any = {};
    if(label){data.lable= label}
    if(address){data.address= address}
    if(city){data.city= city}
    if(zip){data.zip= zip}
    if(state){data.state= state}
    if(isDefault  !== undefined){data.isDefault= isDefault}
    if(lat  !== null){data.lat= Number(lat)}
    if(lng !== null){data.lng= Number(lng)}

    //update it in database
    try {
        await prisma.address.update({
            where : {id: req.params.id  as string},
            data,
        })
    } catch (err : any) {
        return res.status(404).json({message: 'Address not found'})
    }
  const addresses = await prisma.address.findMany({
    where : {userId: req.user!.id},
    orderBy : {createdAt : 'asc'}
  })
  res.json({addresses})
};

//Delete Addresses
//DELETE/api/addresses/:id
export const deleteAddress = async (req: Request, res:Response) => {
    try {
        await prisma.address.delete({
            where : {id: req.params.id as string}
        })
    } catch (err : any) {
        console.log(err.message)
        
    }

    // Add new address
    const addresses = await prisma.address.findMany({
    where : {userId: req.user!.id},
    orderBy : {createdAt : 'asc'}
  })
   res.json({addresses})

}