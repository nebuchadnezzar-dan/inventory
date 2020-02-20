class OrdersController < ApplicationController
  before_action :set_orders, only: %i[show]
  before_action :set_dependencies, only: %i[new]

  def index
    @orders = Order.all
  end

  def new
    @order = Order.new
  end

  def create
    @order = Order.new(order_params)

    if @order.save
      redirect_to order_path(@order)
    else
      render :new
    end
  end

  def show
  end

  def destroy
    
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