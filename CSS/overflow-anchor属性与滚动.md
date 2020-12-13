## overflow-anchor 属性与滚动  

> 用户在观看内容，其中图片没有加载成功。加载成功后会增大内容大小，将用户正在观看的文字或图片顶到下面去

`overflow-anchor`值：`auto||none`,

`auto:`内容变大时，滚动条并不会滚动到其他区域

`none:`内容变大时，滚动条可以滚动到其他区域

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .content,
        .contentOther {
            width: 100px;
            height: 200px;
            overflow: auto;
            overflow-anchor: auto;
            display: inline-block;
        }

        .contentOther {
            overflow-anchor: none;
        }

        p {
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="content">
        一、滚动锚定是什么？
        大家可能有过这样的浏览体验，就是图片很多的时候，例如漫画网站，尤其是条漫，在手机端，垂直布局这种，如果上方的图片加载慢，那么下方的图片看着看着就会被推下来，然后自己又要重新去滚动定位。

        这是一个不太友好的浏览器体验行为。
        <div class="child"></div>
        于是，Chrome 56（2017年）和Firefox 66（2019年）开始最浏览器原来的这些滚动行为进行了优化，实现了一种“滚动锚定”的交互行为。

        具体描述为：当前视区上面的内容突然出现的时候，浏览器自动改变滚动高度，让视区窗口区域内容固定，就像滚动效果被锚定一样。

        因此，在PC端，在Chrome浏览器下和Firefox浏览器下，当你阅读文章或者看条漫的时候，是感觉不到页面跳动的，就是滚动锚定在其作用。
    </div>
    <div class="contentOther">
        一、滚动锚定是什么？
        大家可能有过这样的浏览体验，就是图片很多的时候，例如漫画网站，尤其是条漫，在手机端，垂直布局这种，如果上方的图片加载慢，那么下方的图片看着看着就会被推下来，然后自己又要重新去滚动定位。

        这是一个不太友好的浏览器体验行为。
        <div class="child"></div>
        于是，Chrome 56（2017年）和Firefox 66（2019年）开始最浏览器原来的这些滚动行为进行了优化，实现了一种“滚动锚定”的交互行为。

        具体描述为：当前视区上面的内容突然出现的时候，浏览器自动改变滚动高度，让视区窗口区域内容固定，就像滚动效果被锚定一样。

        因此，在PC端，在Chrome浏览器下和Firefox浏览器下，当你阅读文章或者看条漫的时候，是感觉不到页面跳动的，就是滚动锚定在其作用。
    </div>
    <script>
        let child = document.querySelectorAll(".child");
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                for (let index = 0; index < child.length; index++) {
                    let p = document.createElement("p");
                    p.style.backgroundColor = "red";
                    child[index].appendChild(p);
                }
            }
        }, 3000)
    </script>
</body>

</html>
```

