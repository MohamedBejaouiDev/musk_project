-- Insert products data into Supabase products table
-- This script converts the JSON products data to SQL INSERT statements

INSERT INTO products (
    id, title, brand, category_id, price, discount, badge, stock, 
    images, description, specs, rating_average, rating_count, 
    popularity, created_at
) VALUES
(1, 'Sauvage', 'Dior', 3, 135.00, 10, 'Best Seller', 25, 
 ARRAY['https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw24a244fd/Y0785220/Y0785220_F078524009_E01_RHC.jpg?sw=1024', 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dwa1adb076/Y0000118/Y0000118_E000000916_E02_RHC.jpg?sw=1024', 'https://www.dior.com/dw/image/v2/BGXS_PRD/on/demandware.static/-/Sites-master_dior/default/dw7adf2a9b/Y0000118/Y0000118_E000000916_E01_RHC.jpg?sw=1024'],
 'A radically fresh composition with Calabrian bergamot and Ambroxan',
 '{"topNotes": ["Calabrian Bergamot", "Pepper"], "heartNotes": ["Sichuan Pepper", "Lavender", "Pink Pepper"], "baseNotes": ["Ambroxan", "Cedar", "Labdanum"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.8, 2847, 98, '2024-01-15'::timestamp),

(2, 'Bleu de Chanel', 'Chanel', 2, 145.00, 0, NULL, 18,
 ARRAY['https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_620/bleu-de-chanel-parfum-spray-3-4fl-oz--packshot-default-107180-9564892200990.jpg', 'https://www.chanel.com/images//t_one///q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-premium-107360-9578060840990.jpg', 'https://www.chanel.com/images//t_one/t_fnbedito//q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1020/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-alternative-v1-107360-9533808082974.jpg'],
 'An aromatic-woody fragrance that embodies freedom and determination',
 '{"topNotes": ["Grapefruit", "Lemon", "Mint"], "heartNotes": ["Ginger", "Nutmeg", "Jasmine"], "baseNotes": ["Incense", "Vetiver", "Cedar"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.7, 3156, 97, '2024-02-10'::timestamp),

(3, 'Black Opium', 'Yves Saint Laurent', 5, 128.00, 0, NULL, 22,
 ARRAY['https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw304e7a4c/Holiday2025/LibreVanille/3614274323511.jpg?sw=720&sh=720&sm=cut&sfrm=jpeg&q=85', 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwcb43990f/Holiday2025/LibreVanille/3614274323511_alt1.jpg?sw=720&sh=720&sm=cut&sfrm=jpg&q=85', 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwc18b9b4d/Holiday2025/LibreVanille/3614274323511_alt4.jpg?sw=720&sh=720&sm=cut&sfrm=jpg&q=85'],
 'A seductive gourmand fragrance with coffee and vanilla',
 '{"topNotes": ["Pink Pepper", "Orange Blossom", "Pear"], "heartNotes": ["Coffee", "Jasmine", "Bitter Almond"], "baseNotes": ["Vanilla", "Patchouli", "Cedar"], "sizeMl": 90, "concentration": "Eau de Parfum"}',
 4.6, 2934, 95, '2024-01-20'::timestamp),

(4, 'Oud Wood', 'Tom Ford', 4, 285.00, 0, 'New', 8,
 ARRAY['https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=700px&width=700px', 'https://sdcdn.io/tf/tf_sku_t1xf01_2000x2000_1.png?height=700px&width=700px', 'https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_3.png?height=700px&width=700px'],
 'Rare oud wood with exotic spices and sensual amber',
 '{"topNotes": ["Rosewood", "Cardamom", "Chinese Pepper"], "heartNotes": ["Oud", "Sandalwood", "Vetiver"], "baseNotes": ["Tonka Bean", "Vanilla", "Amber"], "sizeMl": 50, "concentration": "Eau de Parfum"}',
 4.9, 1876, 92, '2024-03-05'::timestamp),

(5, 'La Vie Est Belle', 'Lancôme', 1, 132.00, 0, NULL, 30,
 ARRAY['https://www.lancome-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lancome-us-master-catalog/default/dw578d592a/3605533286555_LA_VIE_EST_BELLE_L_EAU_DE_PARFUM_100ml.jpg?sw=1356&sh=1356&sm=cut&sfrm=jpg&q=70', 'https://th.bing.com/th/id/OIP.PYWzcGqsz-OxiNBTlrDW8gHaHa?w=202&h=202&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1', 'https://th.bing.com/th/id/OIP.x4klHF-xcGNa5WHF9antNQHaHa?w=202&h=202&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1'],
 'A sweet floral gourmand with iris, patchouli and praline',
 '{"topNotes": ["Black Currant", "Pear"], "heartNotes": ["Iris", "Jasmine", "Orange Blossom"], "baseNotes": ["Praline", "Vanilla", "Patchouli"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.5, 2654, 94, '2024-02-28'::timestamp),

(6, 'Acqua di Gio', 'Giorgio Armani', 3, 118.00, 0, NULL, 35,
 ARRAY['https://assets-cf.armani.com/image/upload/f_auto,q_auto:best,ar_4:5,w_1350,c_fill/LE316300_NLP_100ML_F_FW2025.jpg', 'https://www.armanibeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-gac-master-catalog/default/dwd2d2a427/products/ww-00979-arm/ww-00979-arm_acqua-di-gio-eau-de-toilette-100ml-holiday-gift-set_main.jpg?sw=270&sfrm=jpg&q=85', 'https://www.armanibeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-gac-master-catalog/default/dw712e7478/products/ww-00843-arm/ww-00843-arm_acqua-di-gio-eau-de-toilette_altview2.jpg?sw=375&sh=375&sm=cut&sfrm=jpg&q=85'],
 'A fresh aquatic fragrance inspired by the Mediterranean sea',
 '{"topNotes": ["Lime", "Lemon", "Bergamot"], "heartNotes": ["Jasmine", "Calone", "Peach"], "baseNotes": ["Cedar", "Musk", "Amber"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.6, 3421, 96, '2024-01-10'::timestamp),

(7, 'Coco Mademoiselle', 'Chanel', 1, 155.00, 0, NULL, 20,
 ARRAY['https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.1/w_620/coco-mademoiselle-eau-de-parfum-spray-3-4fl-oz--packshot-default-116520-9564892495902.jpg', 'https://www.chanel.com/images//t_one//w_0.91,h_0.91,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/the-signature-coco-mademoiselle-look-set-coco-mademoiselle-eau-de-parfum-50-ml-and-rouge-coco-baume-918-my-rose-1pce-packshot-default-101156-9570550939678.jpg', 'https://www.chanel.com/images//t_one/t_fnbedito//q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1020/the-signature-coco-mademoiselle-look-set-coco-mademoiselle-eau-de-parfum-50-ml-and-rouge-coco-baume-918-my-rose-1pce-packshot-alternative-v1-101156-9570552414238.jpg'],
 'A fresh oriental fragrance with notes of orange and patchouli',
 '{"topNotes": ["Orange", "Mandarin", "Bergamot"], "heartNotes": ["Jasmine", "Rose", "Ylang-Ylang"], "baseNotes": ["Patchouli", "Vetiver", "Vanilla"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.8, 4123, 99, '2024-02-15'::timestamp),

(8, 'Aventus', 'Creed', 3, 445.00, 15, 'Best Seller', 12,
 ARRAY['https://creedboutique.com/cdn/shop/files/aventus-100ml-bottle_3413e5f4-3eee-40b3-8451-2546a370ec5b.jpg?v=1734710265&width=1100', 'https://www.creedfragrance.fr/images?url=https://static.thcdn.com/widgets/216-fr/16/original-Creed_desktop_Aventus_collection_FR_0822-030316.png&format=webp&auto=avif&width=1920&fit=cover', 'https://www.creedfragrance.fr/images?url=https://static.thcdn.com/productimg/original/12852836-2085241119322708.jpg&format=webp&auto=avif&width=1000&height=1000&fit=cover'],
 'A fruity chypre fragrance celebrating strength and success',
 '{"topNotes": ["Pineapple", "Blackcurrant", "Apple"], "heartNotes": ["Birch", "Patchouli", "Jasmine"], "baseNotes": ["Musk", "Oak Moss", "Ambergris"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.9, 5234, 100, '2024-03-01'::timestamp),

(9, 'Good Girl', 'Carolina Herrera', 5, 142.00, 0, NULL, 28,
 ARRAY['https://medias.carolinaherrera.com/cdn-cgi/image/width=1200,quality=90,format=auto,fit=contain/medias/sys_master/images/h1f/h3a/9970520621086/LR-GG-Elixir-1/LR-GG-Elixir-1.jpg', 'https://media.sephora.eu/content/dam/digital/pim/published/C/CAROLINA_HERRERA/P2700015/3136-media_1.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined', 'https://media.sephora.eu/content/dam/digital/pim/published/C/CAROLINA_HERRERA/P2700015/3136-media_2.jpg?scaleWidth=undefined&scaleHeight=undefined&scaleMode=undefined'],
 'A bold oriental floral with tuberose and tonka bean',
 '{"topNotes": ["Almond", "Coffee", "Lemon"], "heartNotes": ["Tuberose", "Jasmine", "Orris"], "baseNotes": ["Tonka Bean", "Cacao", "Sandalwood"], "sizeMl": 80, "concentration": "Eau de Parfum"}',
 4.7, 2876, 93, '2024-01-25'::timestamp),

(10, '1 Million', 'Paco Rabanne', 4, 98.00, 0, NULL, 40,
 ARRAY['https://medias.rabanne.com/cdn-cgi/image/width=342/https://medias.rabanne.com/medias/sys_master/images/h01/hf4/10602562715678/10602562650142/10602562650142.jpg', 'https://th.bing.com/th/id/OIP.t5d89vN--GF16eXm0Ujr8gHaHa?w=172&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1', 'https://th.bing.com/th/id/OIP.b-jwcIijEIitUlY4_ezXKwHaHa?w=172&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1'],
 'A spicy leather fragrance with cinnamon and rose',
 '{"topNotes": ["Grapefruit", "Mint", "Blood Mandarin"], "heartNotes": ["Cinnamon", "Rose", "Spice Notes"], "baseNotes": ["Leather", "Amber", "Patchouli"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.4, 3567, 91, '2024-02-20'::timestamp),

(11, 'Flowerbomb', 'Viktor & Rolf', 1, 165.00, 0, NULL, 15,
 ARRAY['https://www.viktor-rolf.com/cdn/shop/files/20240605_VR_FRAGANCE_SUN_SUPERGA_Flower_Bomb_019-B-P_copy.jpg?v=1760520076&width=900', 'https://th.bing.com/th/id/OIP.rlrNaGwrCYtQ9IAO4l8TEQHaLH?w=142&h=213&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1', 'https://th.bing.com/th/id/OIP.iTOfmELYW8zHMOH_LrVkbgHaIM?w=192&h=213&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1'],
 'An explosive floral bouquet with jasmine and rose',
 '{"topNotes": ["Tea", "Bergamot", "Osmanthus"], "heartNotes": ["Jasmine", "Rose", "Orchid"], "baseNotes": ["Patchouli", "Musk", "Amber"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.6, 2987, 94, '2024-01-18'::timestamp),

(12, 'Tobacco Vanille', 'Tom Ford', 4, 325.00, 0, NULL, 10,
 ARRAY['https://sdcdn.io/tf/tf_sku_T01K01_2000x2000_0.png?height=700px&width=700px', 'https://sdcdn.io/tf/tf_sku_T01K01_2000x2000_1.png?height=700px&width=700px'],
 'A warm spicy fragrance with tobacco leaf and vanilla',
 '{"topNotes": ["Tobacco Leaf", "Spicy Notes", "Ginger"], "heartNotes": ["Tobacco Blossom", "Cacao", "Tonka Bean"], "baseNotes": ["Vanilla", "Dried Fruits", "Woody Notes"], "sizeMl": 50, "concentration": "Eau de Parfum"}',
 4.8, 1654, 89, '2024-03-10'::timestamp),

(13, 'Light Blue', 'Dolce & Gabbana', 3, 112.00, 0, NULL, 32,
 ARRAY['https://www.dolcegabbana.com/dw/image/v2/BKDB_PRD/on/demandware.static/-/Sites-15/default/dwa2c7c0e7/images/zoom/VT01JMVT000_9V000_0.jpg', 'https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/a9ebc5c2-abad-43cc-a496-0674c7e52bb3/jbptyw/std/765x1040/cover?format=auto', 'https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/5dcc6bdd-19bc-4b14-833b-98d8e89ca3b0/gakml8/std/650x830/3?format=auto'],
 'A fresh fruity floral with Sicilian lemon and apple',
 '{"topNotes": ["Sicilian Lemon", "Apple", "Cedar"], "heartNotes": ["Jasmine", "Bamboo", "White Rose"], "baseNotes": ["Cedar", "Musk", "Amber"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.5, 4234, 95, '2024-02-05'::timestamp),

(14, 'Baccarat Rouge 540', 'Maison Francis Kurkdjian', 4, 325.00, 0, 'New', 8,
 ARRAY['https://www.franciskurkdjian.com/dw/image/v2/BJSB_PRD/on/demandware.static/-/Sites-mfk-master-catalog/default/dw66195273/BaccaratRouge540/EDP/ABTEST/3700559603116_BR540_eau-de-parfum_70ml_2000x2000_1.png?sw=640&sh=640&strip=false', 'https://www.franciskurkdjian.com/dw/image/v2/BJSB_PRD/on/demandware.static/-/Sites-mfk-master-catalog/default/dwfba2a709/BaccaratRouge540/EDP/ABTEST/3700559603116_BR540_eau-de-parfum_70ml_2000x2000_2.png?sw=640&sh=640&strip=false', 'https://www.franciskurkdjian.com/dw/image/v2/BJSB_PRD/on/demandware.static/-/Sites-mfk-master-catalog/default/dwc02ecc88/BaccaratRouge540/EDP/ABTEST/3700559603116_BR540_eau-de-parfum_70ml_2000x2000_3.png?sw=640&sh=640&strip=false'],
 'A luminous woody floral with jasmine and saffron',
 '{"topNotes": ["Saffron", "Jasmine"], "heartNotes": ["Amberwood", "Ambergris"], "baseNotes": ["Fir Resin", "Cedar"], "sizeMl": 70, "concentration": "Extrait de Parfum"}',
 4.9, 2134, 97, '2024-03-15'::timestamp),

(15, 'Guilty', 'Gucci', 1, 125.00, 0, NULL, 25,
 ARRAY['https://media.gucci.com/style/HEXFBFBFB_South_0_160_640x640/1690978676/765589_99999_0099_001_100_0000_Light.jpg', 'https://media.gucci.com/style/White_South_0_160_316x316/1690978676/765589_99999_0099_002_100_0000_Light-Gucci-Guilty-Elixir-de-Parfum-pour-Homme-60ml.jpg'],
 'A warm floral oriental with lilac and patchouli',
 '{"topNotes": ["Pink Pepper", "Mandarin", "Bergamot"], "heartNotes": ["Lilac", "Geranium", "Peach"], "baseNotes": ["Patchouli", "Amber", "Vanilla"], "sizeMl": 90, "concentration": "Eau de Parfum"}',
 4.4, 2765, 90, '2024-01-30'::timestamp),

(16, 'Libre', 'Yves Saint Laurent', 1, 138.00, 0, NULL, 22,
 ARRAY['https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw3cedbd53/Images2019/Libre%20Eau%20De%20Parfum/90mL/3614272648425.jpg?sw=1440&sh=1440&sm=cut&sfrm=jpg&q=85', 'https://www.yslbeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-ysl-master-catalog/fr_FR/dwfc682221/square/Fragrance/For-Her/WW-50424YSL_Libre_Eau_de_Parfum/3614272648418_libre_eau_de_parfum_50ml_alt1.jpg?sw=720&sh=720&sm=cut&sfrm=jpg&q=85', 'https://www.yslbeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-ysl-master-catalog/fr_FR/dw8b5bb873/Fragrance/For-Her/WW-50424YSL_Libre_Eau_de_Parfum/still-life-ingredient.jpg?sw=720&sh=720&sm=cut&sfrm=jpg&q=85'],
 'A bold floral lavender with orange blossom and musk',
 '{"topNotes": ["Lavender", "Mandarin", "Black Currant"], "heartNotes": ["Orange Blossom", "Jasmine", "Lavender"], "baseNotes": ["Musk", "Vanilla", "Cedar"], "sizeMl": 90, "concentration": "Eau de Parfum"}',
 4.7, 3098, 96, '2024-02-12'::timestamp),

(17, 'Invictus', 'Paco Rabanne', 3, 105.00, 0, NULL, 38,
 ARRAY['https://medias.rabanne.com/cdn-cgi/image/width=1024/https://medias.rabanne.com/medias/sys_master/images/hd8/h55/10577077010462/10577076944926/10577076944926.jpg', 'https://medias.rabanne.com/cdn-cgi/image/width=700,quality=90/https://medias.rabanne.com/medias/sys_master/images/hb5/h4d/10403446685726/10403446620190/10403446620190.jpg', 'https://medias.rabanne.com/cdn-cgi/image/width=700,quality=90/https://medias.rabanne.com/medias/sys_master/images/he4/h46/10403446882334/10403446816798/10403446816798.jpg'],
 'A fresh woody aquatic with grapefruit and guaiac wood',
 '{"topNotes": ["Grapefruit", "Marine Notes", "Mandarin"], "heartNotes": ["Bay Leaf", "Jasmine", "Hedione"], "baseNotes": ["Guaiac Wood", "Patchouli", "Ambergris"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.5, 3876, 93, '2024-01-22'::timestamp),

(18, 'Sì', 'Giorgio Armani', 1, 135.00, 0, NULL, 20,
 ARRAY['https://www.giorgioarmanibeauty-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-gab-master-catalog/default/dwe431d531/products/A218/A218%202025%20packshots/3605521816658_01.jpg?sw=1442&sh=1442&sm=cut&sfrm=png&q=85', 'https://www.armanibeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-gac-emea-west-Library/default/dw4a9cbdde/landing-pages/si-parfum/si-parfum-edp-image-v2.jpg?sw=562&sh=999&sm=cut&q=85', 'https://www.armanibeauty.fr/dw/image/v2/AAQP_PRD/on/demandware.static/-/Sites-gac-emea-west-Library/default/dw2f0c80ca/landing-pages/si-parfum/si-parfum-content-tile-elegance-img.jpg?sw=1000&sh=1000&sm=cut&q=85'],
 'A chypre fragrance with blackcurrant nectar and vanilla',
 '{"topNotes": ["Blackcurrant Nectar", "Mandarin"], "heartNotes": ["Rose", "Freesia", "May Rose"], "baseNotes": ["Vanilla", "Patchouli", "Ambroxan"], "sizeMl": 100, "concentration": "Eau de Parfum"}',
 4.6, 2543, 92, '2024-02-18'::timestamp),

(19, 'Versace Eros', 'Versace', 3, 115.00, 0, NULL, 30,
 ARRAY['https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dwee6cbd73/original/90_R740110-R100MLS_RNUL_20_ErosEDP100ml-Eros-Versace-online-store_0_5.jpg?sw=1200&q=85&strip=true', 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dwb359d906/original/90_R740108-R050MLS_RNUL_22_ErosEDP50ml-Eros-Versace-online-store_0_5.jpg?sw=550&q=85&strip=true', 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw0d7c3826/original/90_R740210-R100MLS_RNUL_22_Eros~Parfum~100~ml-Eros-Versace-online-store_1_7.jpg?sw=550&q=85&strip=true'],
 'A fresh oriental with mint, lemon and tonka bean',
 '{"topNotes": ["Mint", "Lemon", "Green Apple"], "heartNotes": ["Tonka Bean", "Geranium", "Ambroxan"], "baseNotes": ["Vanilla", "Vetiver", "Oak Moss"], "sizeMl": 100, "concentration": "Eau de Toilette"}',
 4.5, 4321, 94, '2024-01-12'::timestamp),

(20, 'Alien', 'Mugler', 4, 128.00, 20, 'New', 18,
 ARRAY['https://www.mugler.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-mugler-master-catalog/default/dw150a5257/images/pdp/M010401002/M010401002/3439600056969_alien_90ml_refillable_main_v2.jpg?sw=1440&sh=1440&sm=cut&sfrm=png&q=70', 'https://th.bing.com/th/id/OIP._PuFf3u_am1-EWI5yZFJ2gHaHa?w=212&h=212&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1'],
 'A mysterious woody floral with jasmine and cashmeran',
 '{"topNotes": ["Jasmine"], "heartNotes": ["Cashmeran", "Woody Notes"], "baseNotes": ["Amber", "White Amber"], "sizeMl": 60, "concentration": "Eau de Parfum"}',
 4.6, 2987, 91, '2024-03-08'::timestamp);

-- Reset the sequence to continue from the last inserted ID
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));