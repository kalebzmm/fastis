/*! board.js | Huro | Css Ninja 2020-2021 */
"use strict";

class KanBan{

    elements = [];
    dragula;
    onChangeColumn;
    onClick;

    constructor(elements){
        this.elements = elements;
        this.initDragula();
    }

    initDragula(){

        var _this = this;

        this.dragula = dragula(this.elements);
        this.dragula.on("drop", (function(n) {
            let info = { id: $(n).data('id'), status: $(n).closest('.kanban_status').attr('id')};
            _this.onChangeColumnEvent(info);
            _this.update();
        }));

    }
    
    onChangeColumnEvent(info){
        if(typeof this.onChangeColumn == 'function'){
            this.onChangeColumn(info);
        }
    }

    onClickEvent(info){
        if(typeof this.onClick == 'function'){
            this.onClick(info);
        }
    }

    addItem(status, title, id){
        let item = this.createTaskDiv(title, id);
        let _id = '#'+status;
        if($(_id).length <= 0) throw new Error('O status informado não existe');
        let el = $(item);
        $(_id).append(el);
        this.update();
        el.on('click', (ev) => {
            this.onClickEvent({
                id: $(ev.currentTarget).data('id')
            })
        })

    }

    update(){
        $(".kanban-column").each(function() {
            var n = $(this).find(".kanban-card").length;
            $(".column-title h3 span:nth-child(2)", this).html(n),
            $(".collapsed-content .task-count span", this).html(n),
            0 == n ? $(this).addClass("is-empty") : $(this).removeClass("is-empty")
        })
    }

    createTaskDiv(title, id){
        return (`
        <div class="kanban-card" data-id="${id}">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <div class="kanban-card-stats">
                </div>
            </div>
        </div>
        `)
    }

}