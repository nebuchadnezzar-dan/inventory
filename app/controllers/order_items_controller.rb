class OrderItemsController < ApplicationController
  before_action :set_order

  def create
    @order_item = OrderItem.new(order_items_params)

    if @order_item.save
      redirect_to order_path(@order)
    end
  end

  private

  def set_order
    @order = Order.find(params[:order_id])
  end

  def order_items_params
    params.require(:order_item).permit(:order_id, :product_id, :quantity)
  end

end