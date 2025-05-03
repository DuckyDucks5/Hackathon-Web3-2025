import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Error "mo:base/Error";

actor UserManager {
    public type User = {
        username : Text;
        principalId : Text;
        userId : Nat;
    };

    private var userCount : Nat = 0;
    private let users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
    private let usernameToPrincipal = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);

    private func toLower(c : Char) : Char {
        if (c >= 'A' and c <= 'Z') {
            Char.fromNat32(Char.toNat32(c) + 32)
        } else {
            c
        }
    };

    public shared({ caller }) func createUser(username : Text) : async User {
    let principalId = caller;
    let usernameLower = Text.map(username, toLower);

    if (usernameToPrincipal.get(usernameLower) != null) {
        Debug.print("Username already taken: " # username);
        throw Error.reject("Username already taken");
    };

    if (users.get(principalId) != null) {
        Debug.print("Principal already registered: " # Principal.toText(principalId));
        throw Error.reject("Principal already registered");
    };

    userCount += 1;
    let newUser : User = {
        username = username;
        principalId = Principal.toText(principalId);
        userId = userCount;
    };

    users.put(principalId, newUser);
    usernameToPrincipal.put(usernameLower, principalId);

    Debug.print("New user created: " # username # " with ID: " # Nat.toText(userCount));
    return newUser;
};


    public query func getUserInfo(principal : Principal) : async ?User {
        users.get(principal)
    };

    public query func getUserInfoByUsername(username : Text) : async ?User {
        switch (usernameToPrincipal.get(Text.map(username, toLower))) {
            case (?principal) { users.get(principal) };
            case null { null };
        }
    };

    public query func getUserCount() : async Nat {
        userCount
    };
};