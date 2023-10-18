const {Router} = require("@grammyjs/router");
const { bolim, YesNo } = require("../helpers/help.button");

const router = new Router((ctx) => ctx.session.step);

const ism = router.route("Ism");
ism.hears("Ustoz kerak", async (ctx) => {
    await ctx.reply(`<b>Ustoz topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
        {
            parse_mode: "HTML",
        });
    await ctx.reply(`<b>Ism, familiyangizni kiriting?</b>`,
        {
            parse_mode: "HTML"
        });
    ctx.session.step = "UY"
});

const uy = router.route("UY");
uy.on("message:text", async (ctx) => {
    await ctx.reply(`🕑 Yosh: 

Yoshingizni kiriting?
Masalan, 19`);
    ctx.session.fullname = ctx.message.text;
    ctx.session.step = "UT"
});

const ut = router.route("UT");
ut.on("message:text", async (ctx) => {
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    ctx.session.yosh = ctx.message.text;
    ctx.session.step = "UA";
});

const ua = router.route("UA");
ua.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );
    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "UH";
});

const uh = router.route("UH");
uh.on("message:text", async (ctx) => {
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa = ctx.message.text;
    ctx.session.step = "UN"
});

const un = router.route("UN");
un.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Narxi:

To'lov qilasizmi yoki Tekinmi?
Kerak bo'lsa, Summani kiriting?`
    );
    ctx.session.hudud = ctx.message.text;
    ctx.session.step = "UK";
});

const uk = router.route("UK");
uk.on("message:text", async (ctx) => {
    await ctx.reply(`👨🏻‍💻 Kasbi: 

Ishlaysizmi yoki o'qiysizmi?
Masalan, Talaba`);
   
    ctx.session.narx = ctx.message.text;
    ctx.session.step = "UM"
});

const um = router.route("UM");
um.on("message:text", async (ctx) => {
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.kasb = ctx.message.text
    ctx.session.step = "UMq"
});

const umq = router.route("UMq");
umq.on("message:text", async(ctx)=>{
    await ctx.reply(`🔎 Maqsad: 

Maqsadingizni qisqacha yozib bering.`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "UF"
});

const uf = router.route("UF");
uf.on("message:text", async(ctx)=>{
    ctx.session.maqsad = ctx.message.text;
    await ctx.reply(`Ustoz kerak:

    🎓 Shogird: ${ctx.session.fullname}
    🌐 Yosh: ${ctx.session.yosh}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    💰 Narxi: ${ctx.session.narx}
    👨🏻‍💻 Kasbi: ${ctx.session.kasb}
    🕰 Murojaat qilish vaqti: ${ctx.session.murojatvaqt} 
    🔎 Maqsad: ${ctx.session.maqsad}
    
    #shogird`
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...YesNo
        }
    })
    ctx.session.step = "UJ";
});

const uj = router.route("UJ");
uj.hears(`Yoq`, async (ctx) => {
    console.log(ctx.message.text);
    await ctx.reply(`Qabul qilinmadi`, {
        reply_markup: {
            ...bolim
        }
    })
    ctx.session.step = "";
});

uj.hears("Ha", async (ctx) => {
    await ctx.reply(`📪 So'rovingiz tekshirish uchun adminga jo'natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
        reply_markup: {
            ...bolim
        }
    })
});

module.exports = router;