var ArrFastAppi = [];
function isJQ(html, html2)
{
    return $(html).is(html2);
}
function isReady(html)
{
    return isJQ(html, ":visible");
}
function looking(html)
{
    return isReady(html) || isJQ(html, ":not(:visible)");
}


function ob(activ, slave, nactiv, nslave, id, fps)
{
    if (isReady(activ))
    {
        $(activ).click(function () {
            if (activ !== ArrFastAppi[fps].activ + ArrFastAppi[fps].id + "") {
                $(ArrFastAppi[fps].activ + ArrFastAppi[fps].id + "").fadeIn();
                $(ArrFastAppi[fps].slave + ArrFastAppi[fps].id + "").slideUp();
            }
            if (isJQ(this, ".activ_togg"))
            {
                $(slave).slideToggle();
            }
            else
            {
                $(slave).slideDown();
                $(this).hide();
            }
            $(slave + "_on").slideDown();
            $(slave + "_off").slideUp();
            ArrFastAppi[fps].activ = nactiv;
            ArrFastAppi[fps].slave = nslave;
            ArrFastAppi[fps].id = id;

        });
        if (isJQ(activ, ".activ_on"))
            $(activ).click();
        if (isJQ(activ, ".getText"))
        {
            for (var i = 1; i <= 6; i++)
            {
                if (isJQ(slave, ".h_" + i + ""))
                {
                    $(slave).prepend("<h" + i + ">" + $(activ).text() + "</h" + i + ">");
                }
            }
        }


    }
    if(looking(activ+"_1"))
    {
        this.sub=new fast_appi(nactiv+id+"_",nslave+id+"_");
        this.sub.run();
    }
    
    return;

}
function fast_appi(activ, slave)
{
    this.activ = activ;
    this.slave = slave;
    this.inter=[];

    var fp = {activ: this.activ, slave: this.slave, id: 0};
    var z = 0;

    for (var i = 0; i < ArrFastAppi.length; i++)
        if (ArrFastAppi[i].activ === fp.activ)
            z++;

    if (!z)
        ArrFastAppi.push(fp);
    this.fps = ArrFastAppi.length - 1;

    this.run = function ()
    {
        
        for (var i = 1; looking(this.activ + i + ""); i++)
        {

            var cactiv = this.activ + i + "";
            var cslave = this.slave + i + "";
            $(cslave).hide();
            var m=new ob(cactiv, cslave, this.activ, this.slave, i, this.fps);
            this.inter.push(m);

        }
    };
}
