const {Router} = require("@grammyjs/router");
const { bolim, YesNo } = require("../helpers/help.button");

const router = new Router((ctx) => ctx.session.step);

const ism = router.route("Ism");
ism.hears("Hodim kerak", async(ctx)=>{
    await ctx.reply(`<b>Xodim topish uchun ariza berish</b>

Hozir sizga birnecha savollar beriladi. 
Har biriga javob bering. 
Oxirida agar hammasi to'g'ri bo'lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.`,
        {
            parse_mode: "HTML",

        });
    await ctx.reply(`<b>🎓 Idora nomi?</b>`,
        {
            parse_mode: "HTML"
        });
    ctx.session.step = "HT"
});

const ht = router.route("HT");
ht.on("message:text", async(ctx)=>{
    await ctx.reply(`📚 Texnologiya:

Talab qilinadigan texnologiyalarni kiriting?
Texnologiya nomlarini vergul bilan ajrating. Masalan, 
    
Java, C++, C#`
    );
    ctx.session.Idora = ctx.message.text;
    ctx.session.step = "HA";
});

const ha = router.route("HA");
ha.on("message:text", async(ctx)=>{
    await ctx.reply(`📞 Aloqa: 

Bog'lanish uchun raqamingizni kiriting?
Masalan, +998 90 123 45 67`
    );

    ctx.session.texnologiya = ctx.message.text;
    ctx.session.step = "HH"
});

const hh = router.route("HH");
hh.on("message:text", async(ctx)=>{
    await ctx.reply(`🌐 Hudud: 

Qaysi hududdansiz?
Viloyat nomi, Toshkent shahar yoki Respublikani kiriting.`
    );
    ctx.session.aloqa =ctx.message.text
    ctx.session.step = "HM"
});

const hm = router.route("HM");
hm.on("message:text", async(ctx)=>{
    await ctx.reply(`✍️Mas'ul ism sharifi?`);
   
    ctx.session.hudud = ctx.message.text;
    ctx.session.step = "HMt"
});

const htm = router.route("HMt");
htm.on("message:text", async(ctx)=>{
    await ctx.reply(`🕰 Murojaat qilish vaqti: 

Qaysi vaqtda murojaat qilish mumkin?
Masalan, 9:00 - 18:00`
    );
    ctx.session.fullname = ctx.message.text
    ctx.session.step = "HI"
});

const hi = router.route("HI");
hi.on("message:text", async(ctx) => {
    await ctx.reply(`🕰 Ish vaqtini kiriting?`
    );
    ctx.session.murojatvaqt = ctx.message.text
    ctx.session.step = "HMSH"
});

const hmsh = router.route("HMSH");
hmsh.on("message:text", async(ctx)=>{
    await ctx.reply(`💰 Maoshni kiriting?`
    );
    ctx.session.ishvaqt = ctx.message.text
    ctx.session.step = "HQ"
});

const hq = router.route("HQ");
hq.on("message:text", async(ctx)=>{
    await ctx.reply(` ‼️ Qo'shimcha ma'lumotlar?`
    );
    ctx.session.maosh = ctx.message.text
    ctx.session.step = "HX"
});

const hx = router.route("HX");
hx.on("message:text", async(ctx)=>{
    ctx.session.qoshimcha = ctx.message.text;
    await ctx.reply(`Xodim kerak:

    👨‍💼 Idora: ${ctx.session.Idora}
    📚 Texnologiya: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: ${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🌐 Hudud: ${ctx.session.hudud} 
    ✍️ Mas'ul: ${ctx.session.fullname} 
    🕰 Murojaat vaqti: ${ctx.session.murojatvaqt}
    🕰 Ish vaqti: ${ctx.session.ishvaqt}
    💰 Maosh: ${ctx.session.maosh} 
     ‼️ Qo'shimcha: ${ctx.session.qoshimcha}

    #ishJoyi`
    );

    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`,{
        reply_markup:{
            ...YesNo
        }
    })
    ctx.session.step = "hj";
});

const hj = router.route("hj");

hj.hears(`Yoq`, async(ctx)=>{
    await ctx.reply(`Qabul qilinmadi`,{
        reply_markup:{
            ...bolim
        }
    })
        
    ctx.session.step = "";    
});

hj.hears("Ha", async (ctx) => {
    console.log(ctx.message.text);
    await ctx.reply(`📪 So'rovingiz tekshirish uchun adminga jo'natildi!

E'lon 24-48 soat ichida kanalda chiqariladi.`, {
        reply_markup: {
            ...bolim
        }
    });
});

module.exports = router;