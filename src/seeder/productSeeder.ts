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
        image: 'https://example.com/nike-air-max-90.jpg',
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
        image: 'https://example.com/nike-air-force-1.jpg',
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
        image: 'https://example.com/nike-roshe-run.jpg',
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
        image: 'https://example.com/nike-zoom-pegasus.jpg',
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
        image: 'https://example.com/nike-free-rn.jpg',
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
        image: 'https://example.com/nike-cortez.jpg',
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
        image: 'https://example.com/nike-air-jordan-1.jpg',
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
        image: 'https://example.com/nike-sb-dunk.jpg',
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
        image: 'https://example.com/nike-air-max-270.jpg',
        reference: '8765432109',
        price: 180.0,
        stock: 9,
        active: true,
      },
      {
        name: 'Nike Flyknit Racer',
        description:
          'The Nike Flyknit Racer is a lightweight and responsive running shoe that offers a snug and supportive fit.',
        category: 'Running Shoes',
        image: 'https://example.com/nike-flyknit-racer.jpg',
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
