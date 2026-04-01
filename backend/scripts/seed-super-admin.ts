import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

import { RoleType } from '../src/constants/role-type.ts';
import { UserEntity } from '../src/modules/user/user.entity.ts';

// Super Admin configuration - CHANGE THESE VALUES FOR PRODUCTION
const SUPER_ADMIN_CONFIG = {
  firstName: 'Super',
  lastName: 'Admin',
  email: 'superadmin@carwash.com',
  password: 'SuperAdmin123!', // Change this!
  role: RoleType.ADMIN,
  phone: '+1234567890',
};

async function seedSuperAdmin() {
  console.log('🌱 Starting Super Admin seed...');

  // Create DataSource connection
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5434', 10),
    username: process.env.DB_USERNAME || 'carwash_user',
    password: process.env.DB_PASSWORD || 'carwash_password',
    database: process.env.DB_DATABASE || 'carwash_db',
    entities: ['src/modules/**/*.entity.ts'],
    synchronize: false,
    logging: true,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const userRepository = dataSource.getRepository(UserEntity);

    // Check if Super Admin already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: SUPER_ADMIN_CONFIG.email },
    });

    if (existingAdmin) {
      console.log('⚠️  Super Admin already exists:', existingAdmin.email);
      console.log('👤 Admin details:', {
        id: existingAdmin.id,
        email: existingAdmin.email,
        role: existingAdmin.role,
        name: `${existingAdmin.firstName} ${existingAdmin.lastName}`,
      });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_CONFIG.password, saltRounds);

    // Create Super Admin
    const superAdmin = userRepository.create({
      ...SUPER_ADMIN_CONFIG,
      password: hashedPassword,
    });

    await userRepository.save(superAdmin);

    console.log('✅ Super Admin created successfully!');
    console.log('📧 Email:', SUPER_ADMIN_CONFIG.email);
    console.log('🔑 Password:', SUPER_ADMIN_CONFIG.password);
    console.log('⚠️  IMPORTANT: Change the default password immediately after first login!');

  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

// Run seed if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSuperAdmin();
}

export { seedSuperAdmin };
