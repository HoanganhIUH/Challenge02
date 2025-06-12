const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Challenge 2 API',
    description: 'Tài liệu API cho hệ thống quản lý sản phẩm và người dùng',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    {
      name: 'Auth',
      description: 'Các API xác thực người dùng',
    },
    {
      name: 'Product',
      description: 'Các API quản lý sản phẩm',
    },
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.js']; // File entry point của Express (import đầy đủ route ở đây)

swaggerAutogen(outputFile, endpointsFiles, doc);
