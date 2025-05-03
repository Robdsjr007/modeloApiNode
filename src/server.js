import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { pessoaRoutes } from './routes/pessoaRoutes.js';

const app = fastify().withTypeProvider();

// Faz a validação de todos os dados de entrada
app.setValidatorCompiler(validatorCompiler);

// Faz a transformação dos dados de saída
app.setSerializerCompiler(serializerCompiler);

// Todos os endereços de front conseguem acessar
app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'modeloApiNodeFastify',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    // Ao acessar docs, terei acesso a documentação da api
    routePrefix: '/docs',
});

// importa o arquivo de rotas
app.register(pessoaRoutes);

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
});