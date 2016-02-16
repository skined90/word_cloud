/**
 * Created by Igor on 2/16/2016.
 */

(function () {

    function WordCloud(element, words, options){
        this.width = options.width || 320;
        this.height = options.width || 320;
        this.words = words || [];

        this.element = $(element);

        this.init();
    }

    WordCloud.prototype.init = function(){

        this.element.width = this.width;
        this.element.height = this.height;
        this.element.css({
            'background-color': 'red',
            'width' : this.width,
            'height': this.height
        });

    };

    WordCloud.prototype.writeWords = function(){
        var words = this.words;
        var i = 0;
        while(i < words.length){
            var span = document.createElement('span');
            span.style.color = words[i].name;
            span.style.fontSize = words[i].size + 'px';
            span.style.cursor = 'pointer';
            span.innerText = words[i].name;
            span.id = words[i].name;

            if(Math.random()*10 > 5){
                span.style.transform = 'rotate(' + 0 + 'deg)';
                span.style.transformOrigin = 'left bottom';
            }

            this.element.append(span);

            this.randomPositions(span);

            words[i].positions = span.getBoundingClientRect();


            if(this.checkIsItOutOfScreen(words[i])){
                this.element.find(span).remove();
                this.randomPositions(span);
            }
            else{
                i++;
            }


            span.addEventListener('click', function(){
                alert(this.innerText)
            });

        }
    };

    WordCloud.prototype.getWordsWithPositions = function(){
        return this.words;
    };

    WordCloud.prototype.randomNumberBetween = function(start, end){
        return Math.floor(Math.random() * end) + start;
    };

    WordCloud.prototype.checkIsItOutOfScreen = function(word){
        return (word.positions.left < 0 || word.positions.top < 0 || word.positions.right > this.width || word.positions.bottom > this.height);
    };

    WordCloud.prototype.randomPositions = function(element){
        element.style.top = this.randomNumberBetween(1, this.height) + 'px';
        element.style.left = this.randomNumberBetween(1, this.width) + 'px';
    };



    window.WordCloud = WordCloud;

}());

var element = '.word-cloud';

var words = [
    {name: 'yellow', size: Math.floor(Math.random() * 42) + 12},
    {name: 'blue', size: Math.floor(Math.random() * 42) + 12},
    {name: 'black', size: Math.floor(Math.random() * 42) + 12},
    {name: 'pink', size: Math.floor(Math.random() * 42) + 12},
    {name: 'gold', size: Math.floor(Math.random() * 42) + 12},
    //{name: 'cyan', size: Math.floor(Math.random() * 42) + 12},
    //{name: 'magenta', size: Math.floor(Math.random() * 42) + 12},
    //{name: 'brown', size: Math.floor(Math.random() * 42) + 12},
    //{name: 'orange', size: Math.floor(Math.random() * 42) + 12},
];

var options = {

};

x = new WordCloud(element, words, options);
x.writeWords();
