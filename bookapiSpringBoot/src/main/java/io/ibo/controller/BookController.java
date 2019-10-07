package io.ibo.controller;


import java.util.List;
import java.util.HashSet;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.ibo.message.request.LoginForm;
import io.ibo.message.request.SignUpForm;
import io.ibo.message.response.JwtResponse;
import io.ibo.model.Book;
import io.ibo.model.Role;
import io.ibo.model.RoleName;
import io.ibo.model.User;
import io.ibo.repository.RoleRepository;
import io.ibo.repository.UserRepository;
import io.ibo.security.jwt.JwtProvider;
import io.ibo.service.BookService;

@CrossOrigin(origins="*",allowedHeaders="*")
@RestController
@RequestMapping("/api/auth")
public class BookController {
	
	@Autowired
	private BookService bookService;
	
	@Autowired
    AuthenticationManager authenticationManager;
 
    @Autowired
    UserRepository userRepository;
 
    @Autowired
    RoleRepository roleRepository;
 
    @Autowired
    PasswordEncoder encoder;
 
    @Autowired
    JwtProvider jwtProvider;
 
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
 
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
 
        SecurityContextHolder.getContext().setAuthentication(authentication);
 
        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
 
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<String>("Fail -> Username is already taken!",
                    HttpStatus.BAD_REQUEST);
        }
 
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<String>("Fail -> Email is already in use!",
                    HttpStatus.BAD_REQUEST);
        }
 
        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()));
 
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
 
        strRoles.forEach(role -> {
          switch(role) {
          case "admin":
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                  .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
            roles.add(adminRole);
            
            break;
          case "pm":
                Role pmRole = roleRepository.findByName(RoleName.ROLE_PM)
                  .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                roles.add(pmRole);
                
            break;
          default:
              Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                  .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
              roles.add(userRole);              
          }
        });
        
        user.setRoles(roles);
        userRepository.save(user);
 
        return ResponseEntity.ok().body(user);
    }
	 
	    
	@RequestMapping("/api/book")
	
	public List<Book> getAllBooks(){
		return bookService.getAllBooks();
		
		
	}
	
	@RequestMapping(method=RequestMethod.POST , value="/api/book")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Book addBook(@RequestBody Book book) {
		return bookService.addBook(book);
		
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/api/book/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Book updateBook(@RequestBody Book new_book,@PathVariable long id) {
		return bookService.updateBook(new_book,id);
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/api/book/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public long deleteBook(@PathVariable long id) {
		return bookService.deleteBook(id);
	}
}
