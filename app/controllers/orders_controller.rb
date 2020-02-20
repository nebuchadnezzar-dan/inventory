class OrdersController < ApplicationController
  before_action :set_orders, only: %i[show]
  before_action :set_dependencies, only: %i[new]

  def index
  end

  def new
    @order = Order.new
  end

  def create
  end

  def show
  end

  private 

  def set_orders
    @order = Order.find(params[:id])
  end

  def set_dependencies
    @warehouses = Warehouse.all
  end


end