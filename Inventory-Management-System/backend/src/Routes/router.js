import express from "express";
import ProductSchema from "../Models/ProductSchema.js"; // Ensure correct file extension
const router = express.Router();

// Route to insert a product
router.post("/insertproduct", async (req, res) => {
    console.log('hit');
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        // Check if the product already exists
        const pre = await ProductSchema.findOne({ ProductBarcode: ProductBarcode });
        console.log(pre);

        if (pre) {
            return res.status(422).json({ message: "Product is already added" });
        } else {
            // Create a new product
            const addProduct = new ProductSchema({
                ProductName,
                ProductBarcode,
                ProductPrice,
            });

            // Save the product to the database
            await addProduct.save();

            // Send a success response
            return res.status(201).json({ message: "Product added successfully", product: addProduct });
        }
    } catch (error) {
        console.error("Error inserting product:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        // Find the product by ID
        const getProduct = await ProductSchema.findById(req.params.id);

        if (!getProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log(getProduct);
        res.status(200).json(getProduct);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/updateproducts/:id", async (req, res) => {
     const {ProductName,ProductBarcode,ProductPrice}=req.body;
    try {
        // Find the product by ID
       
        const updateProduct = await ProductSchema.findById(req.params.id,{ProductBarcode,ProductName,ProductPrice},{new:true});

        if (!updateProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log(updateProduct);
        res.status(200).json(updateProduct);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/deleteproducts/:id", async (req, res) => {

   try {
       // Find the product by ID
      
       const deleteProduct = await ProductSchema.FindByIdAndDelete(req.params.id);

       if (!deleteProduct) {
           return res.status(404).json({ message: "Product not found" });
       }

       console.log(deleteProduct);
       res.status(200).json(deleteProduct);
   } catch (error) {
       console.error("Error fetching product:", error);
       res.status(500).json({ message: "Server error" });
   }
});

// Export the router
export default router;
