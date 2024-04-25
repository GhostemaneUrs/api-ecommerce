import { Product } from '../entity/product';
import PostgreSQL from '../config/postgresql';

export const seedProducts = async (): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();

    const productsData = [
      {
        name: 'Nike Air Max 90',
        description:
          'The Nike Air Max 90 is a classic sneaker that offers timeless style and comfort.',
        category: 'Running Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/zwxes8uud05rkuei1mpt/air-max-90-zapatillas-dlXJdc.png',
        reference: '1234567890',
        price: 150.0,
        stock: 10,
        active: true,
      },
      {
        name: 'Nike Air Force 1',
        description:
          'The Nike Air Force 1 is a legendary basketball shoe that has become a streetwear staple.',
        category: 'Basketball Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fc4622c4-2769-4665-aa6e-42c974a7705e/air-force-1-07-zapatillas-CFVMS0.png',
        reference: '0987654321',
        price: 100.0,
        stock: 5,
        active: true,
      },
      {
        name: 'Nike Roshe Run',
        description:
          'The Nike Roshe Run is a lightweight and breathable shoe that is perfect for everyday wear.',
        category: 'Casual Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cc57a5a7-02ee-447c-9903-2b9ce369bcf2/flex-experience-run-12-zapatillas-de-running-asfalto-PLHQ6f.png',
        reference: '5678901234',
        price: 80.0,
        stock: 8,
        active: true,
      },
      {
        name: 'Nike Zoom Pegasus',
        description:
          'The Nike Zoom Pegasus is a versatile running shoe that offers responsive cushioning and a secure fit.',
        category: 'Running Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f73d8888-7d7c-44e7-aa3d-c51414a9b8a2/air-zoom-pegasus-40-zapatillas-de-running-asfalto-nino-a-Jqwr5f.png',
        reference: '4321098765',
        price: 120.0,
        stock: 3,
        active: true,
      },
      {
        name: 'Nike Free RN',
        description:
          'The Nike Free RN is a flexible and lightweight running shoe that provides a natural feel.',
        category: 'Running Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8cdca810-dfc3-491d-ade8-f938995fa3bd/free-rn-nn-zapatillas-de-running-asfalto-Gg9wDH.png',
        reference: '6789012345',
        price: 90.0,
        stock: 1,
        active: true,
      },
      {
        name: 'Nike Cortez',
        description:
          'The Nike Cortez is a classic sneaker that is known for its clean and simple design.',
        category: 'Casual Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f8247522-f25c-49de-848f-55527c99a753/cortez-zapatillas-ntjT79.png',
        reference: '5432109876',
        price: 70.0,
        stock: 15,
        active: true,
      },
      {
        name: 'Nike Air Jordan 1',
        description:
          'The Nike Air Jordan 1 is a iconic basketball shoe that is highly sought after by collectors.',
        category: 'Basketball Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8e475055-a3cf-464f-8bd5-23ff8dc0f243/air-jordan-1-low-zapatillas-pL37z4.png',
        reference: '9876543210',
        price: 200.0,
        stock: 2,
        active: true,
      },
      {
        name: 'Nike SB Dunk',
        description:
          'The Nike SB Dunk is a skateboarding shoe that offers excellent board feel and durability.',
        category: 'Skateboarding Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/67c6639e-0620-478b-ad12-53718ea8bb39/sb-force-58-zapatillas-de-skateboard-5SdFD2.png',
        reference: '2109876543',
        price: 130.0,
        stock: 6,
        active: true,
      },
      {
        name: 'Nike Air Max 270',
        description:
          "The Nike Air Max 270 is a lifestyle shoe that features the brand's largest Air unit for maximum cushioning.",
        category: 'Lifestyle Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-zapatillas-nino-a-MLXfXG.png',
        reference: '8765432109',
        price: 180.0,
        stock: 9,
        active: true,
      },
      {
        name: 'Nike Vaporfly 3',
        description:
          'The Nike Vaporfly 3 is a lightweight and responsive running shoe that offers a snug and supportive fit.',
        category: 'Running Shoes',
        image:
          'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a3973ff2-3669-47c5-9ee4-849ca4afd403/vaporfly-3-zapatillas-de-competicion-asfalto-VGktRv.png',
        reference: '1098765432',
        price: 160.0,
        stock: 4,
        active: true,
      },
    ] as Product[];

    for (const product of productsData) {
      const userExist = await dataSource.getRepository(Product).findOneBy({
        name: product.name,
      });

      if (!userExist) {
        dataSource.getRepository(Product).create(product);
        await dataSource.getRepository(Product).save(product);
      }
    }
  } catch (error) {
    console.log('🚀 ~ seedProducts ~ error:', error);
  }
};
