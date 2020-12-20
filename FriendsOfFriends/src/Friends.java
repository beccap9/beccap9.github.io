public class Friends {
	
	//full array (0-49)
	private static int friendships[][] = new int[50][50];
	
	//array with first 17
	private static int fillfriendship[][] = {//change and create a method that does this
			{0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0},
			{0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0},
			{1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0},
			{0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1},
			{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0},	
	}; 

	//the array needed for finding the seperation
	private static int path[][] = new int [50][50];
	
	//first friend entered
	private static int x = 0;
	
	//second friend entered
	private static int y = 0;
	
	//the character used to define what method is called
	private static char letter = 'q';
	
	
	
	
	
	//constructors
	Friends(int x,  int y, char letter){
		this.x = x;
		this.y = y;
		this.letter = letter;
		
	}
	
	Friends(int x, char letter){
		this.x = x;
		this.letter = letter;
	}
	
	Friends(char letter){
		this.letter = letter;
	}
	
	
	
	
	
	//makes the two friends entered friends
	public static void makeFriend() {
		friendships[x][y] = 1;
		friendships[y][x] = 1;
		path[x][y] = 1;
		path[y][x] = 1;
	}//makeFriend
	
	
	
	
	
	//deletes the friendship between the two friends entered
	public static void deleteFriend() {
		friendships[x][y] = 0;
		friendships[y][x] = 0;
		path[x][y] = 99999;
		path[y][x] = 99999;
	}//deleteFriend
	
	
	
	
	
	//counts the number of friends the person entered has
	public int numberFriends() {
		int number = 0;
		
		for(int i = 0; i < friendships[x].length; i++) {
			if(friendships[x][i] == 1) {
				number+=1;
			}//if
		}//for
		
		return number;
	}//numberFriends
	
	
	
	
	
	//returns the separation between the two friends entered
	public int separation() {
		int n = path.length;//sets the length 
		for(int k = 0; k < n; k++) {
			for(int i = 0; i < n; i++) {
				for(int j = 0; j < n; j++) {
				        path[i][j] = Math.min( path[i][j], path[i][k] + path[k][j]);  
				}		
			}	         
		}

		int num = path[x][y];
		return num;
	}//separation
	
	
	
	
	
	//returns how many friends of friends a person has
	public int fof() {
		int number = 0;
		
			for(int i = 0; i<path[x].length; i++) {
				if(path[x][i] == 2) {
					number+=1;
				}//if
			}//for
	
		return number;
	}//fof
	
	
	
	
	//sets the arrays
	public static void setarray() {
		
		for(int i = 0; i<friendships.length;i++) {
			for(int j = 0; j<friendships[i].length; j++) {
				friendships[i][j] = 0;
			}
		}
		
		
		
		
		for(int i = fillfriendship.length; i<friendships.length;i++) {
			for(int j = fillfriendship.length; j<friendships[i].length; j++) {
				friendships[i][j] = 0;
			}
		}
		
		
		
		
		
		for(int i = 0; i< fillfriendship.length; i++) {
			for (int j = 0; j<fillfriendship[i].length; j++){
				friendships[i][j] = fillfriendship[i][j];
			}
		}
		
		
		
		
		for(int i = 0; i< friendships.length; i++) {
			for (int j = 0; j<friendships[i].length; j++){
				if(i == j) {
					path[i][j] = 1;
				}
				else if(friendships[i][j] == 0) {
					path[i][j] = 99999;
				}else {
					path[i][j] = 1;
				}//else
			}
		}
		
		
		

		
	}//setArray
	
	//prints the array for testing
	public static void printArray() {
		for(int i = 0; i<friendships.length; i++) {
			for(int j = 0; j<friendships[i].length; j++) {
				System.out.print(friendships[i][j] + " ");
				
			}
			System.out.println("");
		}
	}//printArray

	
}//Friends