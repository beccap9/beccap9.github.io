import java.util.Scanner;
public class Main {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		
		int x;
		int y;
		char letter;
		String input;
		Friends friend;
		char test;
		
		//set arrays
		Friends.setarray();
		
		
		
		//executes commands until user enters 'q'
		do {
			
		System.out.println("Please enter the command and "
				+ "the people" + "\n" + "or person you want to execute it on");
		input = in.nextLine();
		letter = input.charAt(0);
		
		//determines if the letter, x, and y all need to be used as input and 
		//if the user is entering a two or one digit number
		if(input.length() == 1) {
			friend = new Friends(letter);
		}else if(input.length() == 3) {
			x = input.charAt(2) - 48;
			friend = new Friends(x,letter);
		}else if (input.length() == 4) {
			String str1 = input.substring(2, 4);
			x = Integer.parseInt(str1);
			friend = new Friends(x,letter);
		}else if(input.length() == 5){
			x = input.charAt(2) - 48;
			y = input.charAt(4) - 48;
			friend = new Friends(x,y,letter);
		}else if(input.length() ==6 ) {
			test = input.charAt(4);
			if(test == ' ') {
			String str1 = input.substring(2, 4);
			x = Integer.parseInt(str1);
			y = input.charAt(5) - 48;
			}else {
				String str1 = input.substring(4, 6);
				y = Integer.parseInt(str1);
				x = input.charAt(2) - 48;
			}//if
			friend = new Friends(x,y,letter);
		}else {
			String str1 = input.substring(2, 4);
			x = Integer.parseInt(str1);
			String str2 = input.substring(5, 7);
			y = Integer.parseInt(str2);
			
			friend = new Friends(x,y,letter);
		}//elseif
		
		
		//calls methods from Friends according to input
		if(letter == 'q') {
		Friends.printArray();
		System.exit(0);
		}else if(letter == 'i') {
			Friends.makeFriend();
			
		}else if(letter =='d') {
			Friends.deleteFriend();
			
		}else if(letter == 'n') {
			System.out.println(friend.numberFriends());
			
		}else if(letter =='f'){
			friend.separation();
			System.out.println(friend.fof());
			
		}else if(letter =='s') {
			if(friend.separation() == 99999) {
				System.out.println("No connection");
			}else {
				System.out.println(friend.separation());
			}
		}//elseif
	
		}while(true);
		

	}//main

}//FriendsOfFriends