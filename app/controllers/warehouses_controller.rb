class WarehousesController < AdminController
  before_action :assign_warehouse, only: %i[show edit update destroy]

  def index
    @warehouses = Warehouse.all
  end
    
  def show
    @stock = @warehouse.stocks.new
    @products = Product.all
  end

  def new
    @warehouse = Warehouse.new 
  end

  def edit; end

  def create
    @warehouse = Warehouse.new(warehouse_params)

    if @warehouse.save
      redirect_to warehouse_path(@warehouse)
    else
      render :new
    end    
  end

  def update
    respond_to do |format|
      if @warehouse.update(warehouse_params)
        format.html { redirect_to @warehouse, notice: 'Warehouse was successfully updated.' }
      else
        format.html { render :edit }
      end
    end       
  end

  def destroy
    @warehouse.destroy
    respond_to do |format|
      format.html { redirect_to warehouses_url, notice: 'Warehouse was successfully deleted.' }
    end    
  end

  private

  def assign_warehouse
    @warehouse = Warehouse.find(params[:id])
  end
  
  def warehouse_params
    params.require(:warehouse).permit(:street, :city, :province)
  end

end