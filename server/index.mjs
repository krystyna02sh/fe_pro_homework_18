import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = fastify();
server.register(fastifyStatic, {
    root: path.join(__dirname, '../client'),

})
server.post('/server/index.mjs', (request, reply) => {
    const text = request.body;
    const words = text.split(" ");
    const textArr = [];

    function getCount(array) {
        const uniqueWords = new Set;
        const wordCountMap = new Map;

        array.forEach(function (element) {
            uniqueWords.add(element.toLowerCase());
        });

        const counts = uniqueWords.size;

        array.forEach(function (word) {
            const wordlow = word.toLowerCase();
            if (wordCountMap.has(wordlow)) {
                wordCountMap.set(wordlow, wordCountMap.get(wordlow) + 1);
            } else {
                wordCountMap.set(wordlow, 1);
            }
        });

        const arrayFromSpread = [...wordCountMap.entries()];
        return { counts, arrayFromSpread };
    }

    for (let i = 0; i < words.length; i++) {
        const el = words[i];

        if (el.trim() !== "") {
            textArr.push(el);
        }
    }

    const { counts, arrayFromSpread } = getCount(textArr);

    const responseData = {

        counts: counts,
        arrayFromSpread: arrayFromSpread,
    };

    reply.status(200).send(responseData);
});
server.listen({ port: 5500 })
    .then(() => {
        console.log("Server is started at 5500")
    })

// server.listen(5500, '0.0.0.0', (err, address) => {
//     if (err) {
//         console.error(err);
//         process.exit(1);
//     }
//     console.log(`Server is listening at ${address}`);
// });
// server.post('/server/index.mjs', (request, reply) => {
//     const text = request.body;
//     const words = text.split(" ");
//     const textArr = [];

//     function getCount(array) {
//         const uniqueWords = new Set;
//         const wordCountMap = new Map;

//         array.forEach(function (element) {
//             uniqueWords.add(element.toLowerCase());
//         });

//         const counts = uniqueWords.size;

//         array.forEach(function (word) {
//             const wordlow = word.toLowerCase();
//             if (wordCountMap.has(wordlow)) {
//                 wordCountMap.set(wordlow, wordCountMap.get(wordlow) + 1);
//             } else {
//                 wordCountMap.set(wordlow, 1);
//             }
//         });

//         const arrayFromSpread = [...wordCountMap.entries()];
//         return { counts, arrayFromSpread };
//     }

//     for (let i = 0; i < words.length; i++) {
//         const el = words[i];

//         if (el.trim() !== "") {
//             textArr.push(el);
//         }
//     }

//     const { counts, arrayFromSpread } = getCount(textArr);

//     const responseData = {
//         counts: counts,
//         arrayFromSpread: arrayFromSpread,
//     };

//     reply.status(200).send(responseData);
// });

// server.listen({ port: 5500 })
//     .then(() => {
//         console.log("Server is started at 5500")
//     })
