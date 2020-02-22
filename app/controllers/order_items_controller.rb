class OrderItemsController < ApplicationController
  before_action :set_order
  before_action :set_order_item, only: %i[edit update destroy]
  before_action :set_dependencies, only: %i[edit]

  def create
    @order_item = @order.order_items.new(order_items_params)

    if @order_item.save
      redirect_to order_path(@order)
    end
  end

  def edit;  end

  def update
    respond_to do |format|
      if @order_item.update(order_items_params)
        format.html { redirect_to order_path(@order), notice: 'Order Item was successfully updated.' }
      else
        format.html { render :edit }
      end
    end      
  end

  def destroy 
    @order_item.destroy
    respond_to do |format|
      format.html { redirect_to order_path(@order), notice: 'Order Item was successfully deleted.' }
    end    
  end

  private

  def set_order
    @order = Order.find(params[:order_id])
  end

  def set_order_item
    @order_item = OrderItem.find(params[:id])
  end

  def order_items_params
    params.require(:order_item).permit(:order_id, :product_id, :quantity)
  end

  def set_dependencies
    @products = Product.all
  end

end