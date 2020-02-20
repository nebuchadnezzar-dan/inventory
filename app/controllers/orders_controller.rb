class OrdersController < ApplicationController
  before_action :set_orders, only: %i[show destroy]
  before_action :set_dependencies, only: %i[new]

  def index
    @orders = Order.all
  end

  def new
    @order = Order.new
  end

  def show; end

  def create
    @order = Order.new(order_params)

    if @order.save
      redirect_to order_path(@order)
    else
      render :new
    end
  end

  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully deleted.' }
    end
  end

  private 

  def set_orders
    @order = Order.find(params[:id])
  end

  def set_dependencies
    @warehouses = Warehouse.all
  end

  def order_params
    params.require(:order).permit(:warehouse_id, :customer_name)
  end

end