declare module PIXI {

    export class Container extends DisplayObject {

        constructor();

        children:DisplayObject[];
        height:number;
        width:number;

        addChild(child:DisplayObject):DisplayObject;

        addChildAt(child:DisplayObject, index:number):DisplayObject;

        getBounds():Rectangle;

        getChildAt(index:number):DisplayObject;

        getChildIndex(child:DisplayObject):number;

        getLocalBounds():Rectangle;

        removeChild(child:DisplayObject):DisplayObject;

        removeChildAt(index:number):DisplayObject;

        removeChildren(beginIndex?:number, endIndex?:number):DisplayObject[];

        removeStageReference():void;

        setChildIndex(child:DisplayObject, index:number):void;

        swapChildren(child:DisplayObject, child2:DisplayObject):void;
    }
}